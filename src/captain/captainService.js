import captainModel from "./captain_model.js";

const createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  vehicleColor,
  vehiclePlate,
  vehicleCapacity,
  vehicleType,
}) => {
  if (
    !firstname ||
    !email ||
    !password ||
    !vehicleColor ||
    !vehiclePlate ||
    !vehicleCapacity ||
    !vehicleType
  ) {
    throw new Error("All fields  are required");
  }

  const captainAlready = await captainModel.findOne({ email });
  if (!captainAlready) {
        const captain = captainModel.create({
             fullname: {
                firstname,
                lastname,
            },
            email,
            password,
            vehicle: {
            color: vehicleColor,
            plate: vehiclePlate,
            capacity: vehicleCapacity,
            vehicleType: vehicleType,
            },
        });
        return captain
    }else{
        console.log(captainAlready);

        const result={ alreadyRegister: true,msg:'user is already register'}
        return result
    }

  return captain;
};

export { createCaptain };
