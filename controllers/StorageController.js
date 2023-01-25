import Storage from "../models/StorageModel.js";
import Users from "../models/UsersModel.js";
import { Op } from "sequelize";

export const getStorage = async (req, res) => {
  let response;
  try {
    if (req.role === "admin") {
      response = await Storage.findAll({
        attributes: ["uuid", "name", "type", "slotType", "size"],
        order: [["id", "DESC"]],
        include: [{ model: Users, attributes: ["name", "email"] }],
      });
    } else {
      response = await Storage.findAll({
        attributes: ["uuid", "name", "type", "slotType", "size"],
        where: {
          userId: req.userId,
        },
        order: [["id", "DESC"]],
        include: [{ model: Users, attributes: ["name", "email"] }],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const getStorageById = async (req, res) => {
  try {
    const response = await Storage.findOne({
      where: {
        id: req.params.id,
      },
      order: [["id", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const getStorageBySlot = async (req, res) => {
  try {
    const response = await Storage.findAll({
      where: {
        slotType: req.params.slotType,
      },
      order: [["id", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createStorage = async (req, res) => {
  try {
    await Storage.create({
      name: req.body.title,
      type: req.body.type,
      slotType: req.body.slotType,
      size: req.body.size,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Storage Created" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateStorage = async (req, res) => {
  const storage = await Storage.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  let name = req.body.title;
  let type = req.body.type;
  let slotType = req.body.slotType;
  let size = req.body.size;

  if (name === "" || name === null) {
    name = storage.name;
  }
  if (type === "" || type === null) {
    type = storage.type;
  }
  if (slotType === "" || slotType === null) {
    slotType = storage.slotType;
  }
  if (size === "" || size === null) {
    size = storage.size;
  }

  try {
    if (req.role === "admin") {
      await Storage.update(
        {
          name: name,
          type: type,
          slotType: slotType,
          size: size,
        },
        {
          where: {
            id: storage.id,
          },
        }
      );
    } else {
      await Storage.update(
        {
          name: name,
          type: type,
          slotType: slotType,
          size: size,
        },
        {
          where: {
            [Op.and]: [{ id: storage.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Memory Update Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteStorage = async (req, res) => {
  const storage = await Storage.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!storage) return res.status(404).json({ msg: "Data Not Found" });
  try {
    if (req.role === "admin") {
      await Storage.destroy({
        where: {
          id: storage.id,
        },
      });
    } else {
      await Storage.destroy({
        where: {
          [Op.and]: [{ id: storage.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Delete Success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
