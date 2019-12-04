# Mongo Tips

## findOneAndRemove 和 findOneAndDelete

findOneAndRemove() 会被转成 findAndModify(), findOneAndDelete() 就是纯粹的删除, 没有特殊情况用 findOneAndDelete.
