import {transformAsync} from '@babel/core'
import {isBinaryExpression, logicalExpression, binaryExpression} from '@babel/types'

const visitor = {
  BinaryExpression(path) {
    const node = path.node
    if (isBinaryExpression(node.left)) {
      const right = binaryExpression(node.operator, node.left.right, node.right)
      path.replaceWith(logicalExpression('&&',node.left, right));
    }
  }
}

async function thenTansform (code) {
  return (await transformAsync(code, {
    plugins:[
      {visitor}
    ]
  })).code
}

export default function () {
  return {
    name: 'then-plugin',
    enforce: 'post',
    async transform(code, id) {
      const languageVue = /\.vue?$/.test(id)
      const languageJs = /\.js?$/.test(id)
      if (languageVue || languageJs) {
        return {
          code: await thenTansform(code)
        }
      }
    }
  }
}