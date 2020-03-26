# 控制反转(DI) 和依赖注入(IoC)

controller 依赖于 service， 因为 controller 只处理响应客户端请求接口，而真正提供数据的（操作数据库）的在 service 层，
通过将 service 的实例传入到 controller 中，我们就可以获取到这个依赖，这个行为就称为 **依赖注入(IoC)**。
我们将在 controller 中操作 service ，所以 service 的控制权就交给了 controller，这就是 **控制反转(DI)**。
