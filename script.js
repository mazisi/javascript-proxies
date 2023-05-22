//A proxy object is used in place of another object, called the target object
//Traps are functions that we can add to handle operations on the proxy.
// NB:: Proxies are slower than regular objects..though applicable in proxies involving large data.

// whenever an operation in the proxy occures any corresponding trap we add here will be invoked..
// but if we access the property in the target directly, we will see the value of the property & the trap wont be invoked
// All operations shld be perfomed on the proxy not target...
// Proxy objects created with the constructor can never be deleted..
// otherwise use a revocable proxy by creating a static Proxt object instead of a constructor

//const revocable = Proxy.revocable({},{})
//revocable.revoke()



let library = {version: "1.5.3", _hidden: 'Private' };

library = new Proxy(library, 
    {
        set: (target, property, value, receiver) => {//invoked whenever a property is updated

            if(/^_/.test(property)){
                throw new Error('Private props cannot be changed.')
            } 
            target[property] = value
        },

        get: (target, property, receiver) => {
            if(/^_/.test(property)){//if prop doesnt start with underscore
                throw new Error('Private props cannot be accessed.')
            } 

            //console.log(library.hidden)           That property is hidden..Actually not truly private but we can get closer to
                                                    //  emulating private properties
            
            return target[property]

             },

        ownKeys: (target) => {
            const arr = [];
            for (const prop in target) {
                if(/^_/.test(property)){
                    arr.push(prop)
                }
            }
            return arr;
        },

        deleteProperty: (target, property) => {
            if(/^_/.test(property)){
                throw new Error('Private props cannot be deleted.')
            } 
            return delete target[property]
        },

        has: (target, property) => {        /// Using the Has Trap to manage the `In` operator
                                            //  To prevent prop from reporting that i doesn`t exist when using `in` operator
            if(/^_/.test(property)){
                return false;
            }
            return property in target;
        }
      
     })
     console.log('version' in library)


