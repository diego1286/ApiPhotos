import { Request, Response } from 'express'

import fs from 'fs-extra';
import path from 'path'
import sharp from 'sharp';


import Photo, { IPhoto } from '../models/Photo';

export async function getPhotos(req: Request, res: Response): Promise<Response> {
    const photos = await Photo.find();
    return res.json(photos);
};

export async function createPhoto(req: Request, res: Response): Promise<Response> {
    const { title, description,  author  } = req.body;
    console.log(req.body);
    console.log(req.file)
    const newPhoto = { 
        title: title,
        description:description,
        author:author,
        imagePath: req.file.path
     };
    const photo = new Photo(newPhoto);
    await photo.save();
    return res.json({
        message: 'se guardo con exito',
        photo
    });
};

export async function getPhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Photo.findById(id);
    return res.json(photo);
}

export async function getPhotoDates(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Photo.findById(id);
    if (photo) {
        return res.json({
            title: photo.title,
            description:photo.description,
            author:photo.author,
            createdimg: photo.createdimg,
            updatedimg: photo.updatedimg,
        });
    } else {
        return res.status(404).json({ message: 'foto no encontrada' });
    }
}


export async function deletePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Photo.findByIdAndRemove(id) as IPhoto;
    if (photo) {
        await fs.unlink(path.resolve(photo.imagePath));
    }
    return res.json({ message: 'se elimino la foto' });
};


export async function updatePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description } = req.body;
    console.log(req.body, 'body 64')
    const updatedPhoto = await Photo.findByIdAndUpdate(id, {
        title,
        description
    });

    
    console.log(updatedPhoto, 'actualizacion de la foto 70')
    return res.json({
        message: 'actualizada con exito',
        updatedPhoto
    });
}


export async function convertPhotoToPNG(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
        const photo = await Photo.findById(id);
        if (photo) {
            const imagePath = path.resolve(photo.imagePath);
            const outputPath = imagePath.replace(/\.[^.]+$/, '.png');

            await sharp(imagePath).toFile(outputPath);
            
            photo.imagePath = outputPath;
            await photo.save();

            return res.json({
                id: photo._id,
                title: photo.title,
                description: photo.description,
                imagePath: photo.imagePath,
                createdimg: photo.createdimg,
                updatedimg: photo.updatedimg,
                isPNG: true, 
            });
        } else {
            return res.status(404).json({ message: 'Foto no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener la foto convertida a PNG:', error);
        return res.status(500).json({ message: 'Error al obtener la foto' });
    }
}