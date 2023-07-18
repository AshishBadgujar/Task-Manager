// db.js
import { readFile, writeFile } from 'fs-extra';
import { join } from 'path';

const dataPath = join(process.cwd(), '/data/db.json');

// Function to read data from the JSON file
const readData = async () => {
    try {
        const jsonData = await readFile(dataPath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Error reading data:', error);
        return null;
    }
};

const writeData = async (data) => {
    try {
        await writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8');
        console.log('Data saved successfully.');
    } catch (error) {
        console.error('Error writing data:', error);
    }
};

export { readData, writeData };

