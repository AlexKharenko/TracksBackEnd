const bcrypt = require('bcryptjs');
const QueryBuilder = require('../config/query_builder');
const { Error500 } = require('../errors/index');

const TABLE_NAME = 'users';
const QUERYBUILDER = new QueryBuilder();

const generateWhereStatement = (params) => {
  const whereStatement = [];
  if (params.login) {
    whereStatement.push({
      column: 'login',
      value: `%${params.login}%`,
      comparator: 'ILIKE',
    });
  }
  if (params.email) {
    whereStatement.push({
      column: 'email',
      value: `%${params.email}%`,
      comparator: 'ILIKE',
    });
  }
  if (params.first_name) {
    whereStatement.push({
      column: 'first_name',
      value: `%${params.first_name}%`,
      comparator: 'ILIKE',
    });
  }
  if (params.last_name) {
    whereStatement.push({
      column: 'last_name',
      value: `%${params.last_name}%`,
      comparator: 'ILIKE',
    });
  }
  if (params.role) {
    whereStatement.push({
      column: 'role_id',
      value: params.role,
    });
  }
  return whereStatement;
};

const generateOrderByStatement = (params) => {
  const orderByStatement = {};
  if (params.up === '') {
    orderByStatement.desc = 'ASC';
  } else if (!params.up) {
    orderByStatement.desc = 'DESC';
  }
  if (params.by_user === '') {
    orderByStatement.column = 'user_id';
  }
  return orderByStatement;
};

exports.getUsers = async (params) => {
  const res = await QUERYBUILDER.find({
    table_name: TABLE_NAME,
    where: generateWhereStatement(params),
    order_by: generateOrderByStatement(params),
    join: {
      column: 'role_id',
      compare_table: 'user_roles',
      compare_column: 'role_id',
    },
    offset: params.offset || '',
    limit: params.limit || '',
  });
  const users = res.map((user) => {
    const { password, ...new_user } = user;
    return new_user;
  });
  return users;
};

exports.getRoles = async () => {
  const res = await QUERYBUILDER.find({
    table_name: 'user_roles',
    where: [],
  });
  return res;
};

exports.getUserById = async (user_id, full_data = false) => {
  const res = await QUERYBUILDER.findOne({
    table_name: TABLE_NAME,
    where: [{ column: 'user_id', value: user_id }],
    join: {
      column: 'role_id',
      compare_table: 'user_roles',
      compare_column: 'role_id',
    },
  });
  if (full_data) {
    return res;
  }
  const { password, ...user } = res;
  return user;
};

exports.getUserByEmail = async (email, full_data = false) => {
  const res = await QUERYBUILDER.findOne({
    table_name: TABLE_NAME,
    where: [{ column: 'email', value: email }],
    join: {
      column: 'role_id',
      compare_table: 'user_roles',
      compare_column: 'role_id',
    },
  });
  if (full_data) {
    return res;
  }
  const { password, ...user } = res;
  return user;
};

exports.isLoginExist = async (login) => {
  try {
    const user = await QUERYBUILDER.findOne({
      table_name: TABLE_NAME,
      where: [{ column: 'login', value: login }],
    });

    if (user) return true;
    return false;
  } catch (err) {
    throw new Error500(err.message);
  }
};

exports.isEmailExist = async (email) => {
  try {
    const user = await QUERYBUILDER.findOne({
      table_name: TABLE_NAME,
      where: [{ column: 'email', value: email }],
    });
    if (user) return true;
    return false;
  } catch (err) {
    throw new Error500(err.message);
  }
};

exports.createUser = async (user) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  const new_user = {
    first_name: user.first_name,
    last_name: user.last_name,
    login: user.login,
    email: user.email,
    password: hashedPassword,
  };
  try {
    await QUERYBUILDER.create({
      table_name: TABLE_NAME,
      columns: Object.keys(new_user),
      values: Object.values(new_user),
    });
  } catch (err) {
    throw new Error(err);
  }
};

exports.changeUserRole = async (user) => {
  const { user_id, role_id } = user;
  try {
    await QUERYBUILDER.update({
      table_name: TABLE_NAME,
      columns: ['role_id'],
      values: [role_id],
      where: [{ column: 'user_id', value: user_id }],
    });
  } catch (err) {
    throw new Error500(err.message);
  }
};

exports.deleteUser = async (user) => {
  try {
    await QUERYBUILDER.delete({
      table_name: TABLE_NAME,
      where: [{ column: 'user_id', value: user.user_id }],
    });
  } catch (err) {
    throw new Error500(err.message);
  }
};
