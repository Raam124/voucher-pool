const { Role } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const userService = require('../services/user')

exports.ensureAuthorizedUser = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const accessToken = bearer[1];
      
      if (!accessToken) {
        res.sendStatus(401);
      } else {
        try {
          // Extract a user and add it into the request
          const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
          
          // Verify that this user exists
          if (decoded) {
            try {
              const user = await userService.getUserById(decoded.data.userId);
              if (user) {
                req.user = user;
                next();
              }else{
                res.sendStatus(401);
              }
            } catch (e) {
              res.status(500).json({message: e.message });
            }
          } else {
            res.status(401).json({message: 'User data not found' });
          }
        } catch (error) {
          res.status(401).json({message: error.message });
        }
      }
      return res;
    } else {
      res.status(401).json({message: "Unauthorized" });
    }
  };

  exports.ensureAdminAuthorizedUser = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const accessToken = bearer[1];
      
      if (!accessToken) {
        res.sendStatus(401);
      } else {
        try {
          // Extract a user and add it into the request
          const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
          
          // Verify that this user exists
          if (decoded) {
            try {
              const user = await userService.getUserById(decoded.data.userId);
              if (user) {
                if(user.role != Role.ADMIN){
                  res.status(403).json({message: 'Permission denided' });
                }
                else{
                  req.user = user;
                  next();
                }
              }else{
                res.sendStatus(401);
              }
            } catch (e) {
              res.status(500).json({message: e.message });
            }
          } else {
            res.status(401).json({message: 'User data not found' });
          }
        } catch (error) {
          res.status(401).json({message: error.message });
        }
      }
      return res;
    } else {
      res.status(401).json({message: "Unauthorized" });
    }
  };

  exports.possibleAuthorizedUser = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
  
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const accessToken = bearer[1];
  
      if (accessToken) {
        try {
          // Extract a user and add it into the request
          const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
  
          // Verify that this user exists
          if (decoded.data.userId && decoded.data.role && decoded.data.email) {
            try {
              const user = await userService.getUserById(decoded.data.userId);
  
              if (user) {
                req.user = user;
              }
            } catch (e) {
              res.status(401).json({message: e.message });
            }
          }
        } catch (error) {
          res.status(401).json({message: error.message });
        }
      }
    }
    next();
  };