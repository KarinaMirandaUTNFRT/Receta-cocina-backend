import mongoose from "mongoose";

const conectarDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.info("Conexión a la db exitosa");
  
  } catch (error) {
    console.error(error);

  }
};

conectarDb();
