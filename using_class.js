'use stcrict';

let counter = 1;

class Http{

    constructor(){
          
        return new Proxy(this,{
           set: (target, prop, value) => {
             if (target[prop]) {
                target[prop] = value;
                this.updateUser(target).then(() => {
                    console.log('User updated');
                });
             }
             target[prop] = value;
             return true;        //avoid falsish value error
           }
        });
    }

    async updateUser(resource){
        const res = await fetch(`update/${resource.id}`,{
            method: 'PUT',
            headers: {'Content-Type': 'appliction/json'},
            body: JSON.stringify(resource)
        });
        return res;
    }
}

class User extends Http{

    constructor(name, age){
        super();
        this.name = name;
        this.age = age;
        this.id= ++counter;
    }
}

const user  = new User('Mazisi', 30)

// user.age=90;             //whenever we update any prop a put request will be made