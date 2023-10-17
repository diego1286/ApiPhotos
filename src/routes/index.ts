import { Router } from 'express'
const router = Router();

import uploads from '../libs/multer'
import { getPhotos, createPhoto, deletePhoto, getPhoto, updatePhoto, getPhotoDates, convertPhotoToPNG } from '../controllers/photo.controller'




// routes
router.route('/photos')
    .get(getPhotos)
    .post(uploads.single('image'), createPhoto);

router.route('/photos/:id')
    .get(getPhoto)
    .delete(deletePhoto)
    .put(updatePhoto);


router.route('/photos/:id/dates')
    .get(getPhotoDates);

//  ruta para convertir a formato PNG
router.route('/photos/:id/convertpng')
    .post(convertPhotoToPNG);
    
export default router;