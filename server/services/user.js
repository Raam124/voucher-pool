const prisma = require('../prisma/config')

exports.createUser = async function(data){
    const user = await prisma.user.create({
        data: data,
        select: {
            id:true,
            email: true,
            firstName:true,
            lastName:true,
            role:true,
            isActive: true,
            createdAt:true
        },
      })
    
    return user;
}

exports.getAllUsers = async function(){
    const users = await prisma.user.findMany({
    });
    return users
}

exports.getUserByEmail = async function(email){
    const user = await prisma.user.findUniqueOrThrow({
        where: {
          email: email,
        },
    });
    return user
}

exports.getUserById = async function(userId){
    const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
        select: {
            id:true,
            email: true,
            firstName:true,
            lastName:true,
            role:true,
            isActive: true,
            createdAt:true
        },
    });
    return user
}

exports.updateUserById = async function(userId,data){
    const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data:data,
        select: {
            id:true,
            email: true,
            firstName:true,
            lastName:true,
            role:true,
            isActive: true,
            createdAt:true
        },
    });
    return user
}

exports.deleteUserById = async function(userId){
    const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data:{
            isActive:false
        },
        select: {
            id:true,
            email: true,
            firstName:true,
            lastName:true,
            role:true,
            isActive: true,
            createdAt:true
        },
    });
    return user
}

exports.updateUserPasswordById = async function(userId,password){
    const user = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            password: password
        }
    });
    
    return user;
}

exports.updateUserEamilVerifiedById = async function(userId,value){
    const user = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            emailVerified: value,
            isActive:true
        }
    });
    
    return user;
}
