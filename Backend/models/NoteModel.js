import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Note = db.define('notes', {
    judul: DataTypes.STRING,
    konten: DataTypes.STRING,
    tgl: DataTypes.DATEONLY,
}, { 
   freezeTableName: true 
});

export default Note;

(async() => {
    await db.sync();
})();
