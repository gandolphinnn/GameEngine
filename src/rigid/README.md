# @Gandolphinnn/npm_rigid2

LayerMaks: solo i RigidBodies con lo stesso LayerMask verrano considerati durante la fase di calcolo delle collisioni.

TODO:
- capire se e come associare gli oggetti di graphics a un RigidBody
- intergare il calcolo di un "RigidBound", cioè un singolo Rigidrect contenente esattamente tutti i rigidbodies di un gameobject, utilizzato durante la BroadPhase del calcolo delle collisioni per ottimizzare le prestazioni di calcolo tra gameobjects differenti