const permission = require('../consts/permission');

/* Import controllers */
const userController = require('../controllers/userController');

/* Import validation schema */
const UserSchema = require('../dtos.schemas/UserSchema');

const { role } = permission;

const END_POINTS = {
  Users: '/users/',
  UserById: '/users/:id/',
};

exports.getEndpoints = () => [
  {
    url: END_POINTS.Users,
    controller: userController.getAll,
    permissions: [role.Admin]
  },
  {
    url: END_POINTS.UserById,
    controller: userController.getById,
    permissions: [role.Admin]
  }
];

exports.postEndpoints = () => [
  {
    url: END_POINTS.Users,
    controller: userController.save,
    validationSchema: UserSchema.schema,
    permissions: [role.Admin]
  }
];
