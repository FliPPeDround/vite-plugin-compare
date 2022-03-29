import type { Plugin } from 'vite'
import { createFilter, FilterPattern } from '@rollup/pluginutils'
import {transformAsync} from '@babel/core'
import {isBinaryExpression, logicalExpression, binaryExpression, isLogicalExpression} from '@babel/types'

const binaryVisitor = {
  BinaryExpression(path:any) {
    const node = path.node
    const operatorList = ['<','>','<=','>=']
    if (isBinaryExpression(node.left) && operatorList.indexOf(node.operator) !== -1) {
      const right = binaryExpression(node.operator, node.left.right, node.right)
      path.replaceWith(logicalExpression('&&',node.left, right))
    }
  }
}

const logicalVisitor = {
  LogicalExpression(path:any) {
    const node = path.node
    if(isLogicalExpression(node.left) && !isBinaryExpression(node.right)) {
      const { left, operator } = findFirstNode(node)
      const right = binaryExpression(operator, left, node.right)
      path.replaceWith(logicalExpression(node.operator, node.left, right))
    }
    if (isBinaryExpression(node.left) && !isBinaryExpression(node.right)) {
      const right = binaryExpression(node.left.operator, node.left.left, node.right)
      path.replaceWith(logicalExpression(node.operator, node.left, right))
    }
  }
}

function findFirstNode (node: any): any {
  if (isBinaryExpression(node.left)) {
    return {
      left: node.left.left,
      operator: node.left.operator
    }
  } else {
    return findFirstNode(node.left)
  }
}

async function thenTansform (code: string) {
  return (await transformAsync(code, {
    plugins:[
      {visitor: logicalVisitor},
      {visitor: binaryVisitor}
    ]
  }))?.code as string
}

interface Options {
  include?: FilterPattern
  exclude?: FilterPattern
}

function VitePluginCompare(options: Options = {}): Plugin {
  return {
    name: 'vit-plugin-compare',
    enforce: 'post',
    async transform(code: string, id: string) {
      const { 
        include = /\.(js|tsx|vue|ts|tsx)/,
        exclude = /node_modules/
      } = options
      const filter = createFilter(include, exclude)
      if (filter(id)) {
        return { code: await thenTansform(code) }
      }
    }
  }
}

export default VitePluginCompare
