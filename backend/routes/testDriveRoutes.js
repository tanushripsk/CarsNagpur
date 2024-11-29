const { cancelTestDrive, createTestDrive, deleteTestDrive, getTestDriveById, getTestDrives, updateTestDrive } = require ('../controller/testDriveController')

const express = require ('express')


const router = express.Router();

router.post('/create', createTestDrive);
router.get('/get', getTestDrives);
router.get('/get/:id', getTestDriveById);
router.patch('/update/:id', updateTestDrive);
router.patch('/:id/cancel', cancelTestDrive);
router.delete('/delete/:id', deleteTestDrive);

module.exports = router