// 从树形结构结构中挑选id，存入新数组

export function treeToList(tree){
    // 定义一个数组resutlArr存放选中id的数组
    let ressultArr=[]
    // 遍历->将树形结构转换
    let tempArr=[]
    tempArr=tempArr.concat(JSON.parse(JSON.stringify(tree)))
    console.log(tempArr)
    while (tempArr.length) {
        var node=tempArr.shift()
        console.log(node)
        if(node.children){
            tempArr=tempArr.concat(node.children)
        delete node['children']
        }else{
            ressultArr.push(node.id)
        }
      
    }
    return ressultArr

}