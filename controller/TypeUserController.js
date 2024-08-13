import { where } from 'sequelize';
import {TypeModel} from '../model/TypeModel.js'
import { UserModel } from '../model/UserModel.js';
//Fucion para mostrar
export const getTypeModel = async (req, res) => {
    const types = await TypeModel.findAll({
      attributes: { exclude: ["status"] },
      where: { status: false },
    });
    if (!types) {
      return res.status(401).json({ message: "there is not data" });
    }
    res.status(200).json({ type: types });
  };
//Fucincon para agregar
export const store = async (req, res) => {
    try {
        const { type } = req.body;
        if (!type) {
          res.status(401).json({ message: "No se permiten campos vacios" });
        } else {
          const tp = await TypeModel.create({
            type: type,
          });
          res.status(201).json({ message: "Create sucessfull", type: tp });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Funcion para editar

export const updateTypeUser= async(req, res)=>{
    try{
        
        const id =parseInt(req.params.id);
        const{type}=req.body;

        if(!type){
            return res.status(404).json("No encontrado");
        }
        const typeFinded = await TypeModel.findByPk(id);
        if(typeFinded){
            typeFinded.set({type});
            typeFinded.save();
            return res.status(404).json("Edicion correcta");
        }else{
            return res.status(400).json({msg:"El tipo de usuario no existe."})
        }
    }
    catch(error){
        res.status(500).json({ message: error.message });
   }
};

// Funcion para eliminar
export  const deleteTypeUser = async(req, res)=>{
    try {
        const id = req.params.id;
        const typeFinded = await TypeModel.findByPk(id);
        if (typeFinded) {
            typeFinded.set({status :true});
            typeFinded.save();
           return res.status(200).json({message:'Eliminado Correctamente' })
        }else{
            return res.status(404).json({ message: "not type found"})
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

