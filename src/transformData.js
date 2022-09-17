export default (data) => {
  const { large: image } = data.picture;
  const { phone, email } = data;
  const {
    login: { password },
  } = data;
  const {
    dob: { age },
  } = data;
  const {
    street: { name, number },
  } = data.location;
  const {
    name: { first, last },
  } = data;

  return {
    image,
    phone,
    email,
    password,
    age,
    street: `${name} ${number}`,
    name: `${first} ${last}`,
  };
};
