import express from 'express'
import multer from 'multer'
import path from 'path'
import auth from '../middlewares/authMiddleware.js'
const router = express.Router()

// CREATE LOCAL STORAGE FOR MULTER FILES
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/')
	},
	filename(req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		)
	},
})

// CHECK FOR FILE TYPES
/* const checkFileType = (file, cb) => {
	console.log(file)
	console.log(path.extname(file.originalname))
	const filetypes = /jpg | jpeg |png/
	const extname = filetypes.test(path.extname(file.orginalname))
	const mimetype = filetypes.test(file.mimetype)
	if (extname && mimetype) cb(null, true)
	else cb('Allowed file types are jpg, jpeg and png only')
} */

// CREATE UPLOAD MIDDLEWARE
const upload = multer({
	storage,
	limits: {
		fileSize: 2000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			cb(new Error('Allowed files are jpg, jpeg and png only'))
		}
		cb(undefined, true)
	},
})

// FINALLY THE UPLOAD ROUTE
router.post('/', auth, upload.single('image'), (req, res) => {
	res.send(`/${req.file.path}`)
})

export default router
