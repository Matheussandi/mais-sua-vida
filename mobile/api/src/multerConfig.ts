import multer from 'multer';
import path from 'path';

export const storage = multer.diskStorage ({
	destination: async (request, file, callback) => {
		callback(null, path.resolve(__dirname, '..', 'uploads'));
	},
	filename: (request, file, callback) =>{
		callback(null, `${Date.now()}-${file.originalname}`);
	}
});

