// require('dotenv').config(); // Ensure environment variables are loaded
// const { MongoClient, GridFSBucket } = require('mongodb');
// const fs = require('fs-extra');
// const path = require('path');
// const Cake = require('../server/models/Cake'); // Adjust the path to your Cake model

// const uri = process.env.MONGO_URI || "mongodb+srv://rsj27:Romirowii122$@ccakescluster.9lh5hua.mongodb.net/?retryWrites=true&w=majority&appName=CCakesCluster";
// const dbName = 'CCakes';

// // MongoDB connection
// const connectDB = async () => {
//   try {
//     const client = new MongoClient(uri);
//     await client.connect();
//     console.log('MongoDB connected');
//     const db = client.db(dbName);
//     return { client, db };
//   } catch (error) {
//     console.error('MongoDB connection failed:', error.message);
//     process.exit(1);
//   }
// };

// // Upload image and create cake
// const uploadImageAndCreateCake = async (imagePath, cakeData, db) => {
//   try {
//     console.log('Uploading image:', imagePath);

//     // Initialize GridFS
//     const bucket = new GridFSBucket(db, { bucketName: 'TestPics' });
//     const fileName = path.basename(imagePath);

//     const readStream = fs.createReadStream(imagePath);
//     const uploadStream = bucket.openUploadStream(fileName);

//     // Add event listeners before piping
//     const fileUploadPromise = new Promise((resolve, reject) => {
//       uploadStream.on('finish', (file) => {
//         console.log('File uploaded to GridFS:', file);

//             // Save cake data
//         try {
//             const cake = new Cake(cakeData);
//             cake.save();
//             console.log('Cake added:', cake);
//         } catch (err) {
//             console.error('Error saving cake:', err);
//         }

//         // Check if the file object has the expected properties
//         if (file && file._id) {
//           // Add cake data with image reference
//           cakeData.imageId = file._id; // Store the file ID
//           resolve();
//         } else {
//           reject(new Error('File upload finished but no file information was returned.'));
//         }
//       });

//       uploadStream.on('error', (err) => {
//         console.error('Error uploading file:', err);
//         reject(err);
//       });
//     });

//     // Add debug logs
//     readStream.on('open', () => console.log('Read stream opened.'));
//     readStream.on('data', (chunk) => console.log('Read stream data chunk received.'));
//     readStream.on('end', () => console.log('Read stream ended.'));
//     readStream.on('error', (err) => {
//       console.error('Error reading file:', err);
//       uploadStream.destroy(); // Abort the upload stream on read errors
//     });

//     // Pipe the read stream to the upload stream
//     readStream.pipe(uploadStream);

//     // Wait for the upload stream to finish
//     await fileUploadPromise;

    
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

// // Main function to process images
// const main = async () => {
//   let client;
//   try {
//     const { client: connectedClient, db } = await connectDB(); // Ensure the DB is connected
//     client = connectedClient;

//     const imageFolder = "D:\\Projects - 2024\\chandi-cakes\\server\\Mum's cake pictures";

//     const cakeTypes = [
//       'Chocolate', 'Vanilla', 'Strawberry', 'Red Velvet', 'Carrot', 'Lemon', 'Cheesecake',
//       'Pineapple', 'Coconut', 'Coffee', 'Black Forest', 'Sponge', 'Mango', 'Raspberry',
//       'Hazelnut', 'Almond', 'Mint', 'Peach', 'Blueberry', 'Cinnamon', 'Maple', 'Banana'
//     ];

//     try {
//       const files = await fs.readdir(imageFolder);
//       console.log('Processing images...');
//       for (let i = 0; i < files.length; i++) {
//         const imagePath = path.join(imageFolder, files[i]);
//         if (await fs.pathExists(imagePath)) {
//           const cakeName = `${cakeTypes[i % cakeTypes.length]} Cake #${i + 1}`;
//           const cakeData = {
//             name: cakeName,
//             category: 'Cake',
//             unitPrice: 10.00
//           };
//           console.log('Uploading and creating cake:', cakeName);
//           await uploadImageAndCreateCake(imagePath, cakeData, db);
//         } else {
//           console.warn('File does not exist:', imagePath);
//         }
//       }
//     } catch (error) {
//       console.error('Error reading directory or processing files:', error);
//     }
//   } catch (error) {
//     console.error('Error in main function:', error);
//   } finally {
//     if (client) {
//       await client.close(); // Close the MongoDB client connection
//     }
//   }
// };

// main();

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

// Array of random cake names
const cakeNames = [
  'Vanilla Cake', 'Chocolate Cake', 'Sponge Cake', 'Red Velvet Cake', 'Carrot Cake', 'Lemon Cake',
  'Cheesecake', 'Coffee Cake', 'Black Forest Cake', 'Marble Cake', 'Pound Cake', 'Angel Food Cake'
];

// Function to get a random cake name
const getRandomCakeName = () => {
  return cakeNames[Math.floor(Math.random() * cakeNames.length)];
};

// Directory containing the images
const imageDir = "D:\\CCakes-MERN\\server\\Mum's cake pictures";

// Function to upload a single image
const uploadImage = async (filePath) => {
  const formData = new FormData();
  const fileStream = fs.createReadStream(filePath);

  formData.append('name', getRandomCakeName());
  formData.append('category', 'Dessert');
  formData.append('unitPrice', (Math.random() * 10 + 5).toFixed(2)); // Random price between 5 and 15
  formData.append('image', fileStream);

  try {
    const res = await axios.post('http://localhost:5000/api/cakes', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });
    console.log(`Uploaded: ${filePath} -> ${res.data.name}`);
  } catch (error) {
    console.error(`Error uploading ${filePath}: ${error.message}`);
  }
};

// Function to upload all images in the directory
const uploadAllImages = async () => {
  const files = fs.readdirSync(imageDir);

  for (const file of files) {
    const filePath = path.join(imageDir, file);
    await uploadImage(filePath);
  }

  console.log('All images uploaded');
};

// Start the upload process
uploadAllImages();