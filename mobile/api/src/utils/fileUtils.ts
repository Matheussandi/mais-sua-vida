import fs from 'fs';

export async function deleteFile(filePath: string): Promise<void>{
	try{

		if(fs.existsSync(filePath)){
			fs.unlinkSync(filePath);
			console.log(`Sucessefully deleted file ${filePath}`);
		}

	}catch(error){
		console.error('Erro ao excluir o arquivo:');
	}
}
