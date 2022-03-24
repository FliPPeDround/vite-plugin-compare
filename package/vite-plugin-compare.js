import { transformAsync } from '@babel/core';
import { isBinaryExpression, logicalExpression, binaryExpression, isLogicalExpression } from '@babel/types';
const binaryVisitor = {
    BinaryExpression(path) {
        const node = path.node;
        const operatorList = ['<', '>', '<=', '>='];
        if (isBinaryExpression(node.left) && operatorList.indexOf(node.operator) !== -1) {
            const right = binaryExpression(node.operator, node.left.right, node.right);
            path.replaceWith(logicalExpression('&&', node.left, right));
        }
    }
};
const logicalVisitor = {
    LogicalExpression(path) {
        const node = path.node;
        if (isLogicalExpression(node.left) && !isBinaryExpression(node.right)) {
            const { left, operator } = findFirstNode(node);
            const right = binaryExpression(operator, left, node.right);
            path.replaceWith(logicalExpression(node.operator, node.left, right));
        }
        if (isBinaryExpression(node.left) && !isBinaryExpression(node.right)) {
            const right = binaryExpression(node.left.operator, node.left.left, node.right);
            path.replaceWith(logicalExpression(node.operator, node.left, right));
        }
    }
};
function findFirstNode(node) {
    if (isBinaryExpression(node.left)) {
        return {
            left: node.left.left,
            operator: node.left.operator
        };
    }
    else {
        return findFirstNode(node.left);
    }
}
async function thenTansform(code) {
    return (await transformAsync(code, {
        plugins: [
            { visitor: logicalVisitor },
            { visitor: binaryVisitor }
        ]
    }))?.code;
}
export default function () {
    return {
        name: 'compare-plugin',
        enforce: 'post',
        async transform(code, id) {
            const languageVue = /\.vue?$/.test(id);
            const languageJs = /\.js?$/.test(id);
            const moduls = /node_modules/g.test(id);
            if ((languageVue || languageJs) && !moduls) {
                return {
                    code: await thenTansform(code)
                };
            }
        }
    };
}
//# sourceMappingURL=vite-plugin-compare.js.map