import express from 'express'
import multer from 'multer'
import path from 'path'
const router = express.Router()

// CREATE LOCAL STORAGE FOR MULTER FILES
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'upload/')
	},
	filename(req, fil, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		)
	},
})

// CHECK FOR FILE TYPES
const checkFileType = (file, cb) => {
	const filetypes = /jpg | jpeg |png/
	const extname = filetypes.test(
		path.extname(file.orignalname).toLocaleLowerCase()
	)
	const mimetype = filetypes.test(file.mimetype)
	if (extname && mimetype) cb(null, true)
	else cb('Allowed file types are jpg, jpeg and png only')
}

// CREATE UPLOAD MIDDLEWARE
const upload = multer({
	storage,
	limits: {
		fileSize: 2000000,
	},
	fileFilter(req, file, cb) {
		checkFileType(file, cb)
	},
})

// FINALLY THE UPLOAD ROUTE
router.post('/', upload.single('image'), (req, res) => {
	res.send(`/${req.file.path}`)
})

export default router
