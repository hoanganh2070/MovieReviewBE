import {v2 as cloudinary} from 'cloudinary';

export const  CloudinaryProvider = {
    provide: 'Cloudinary',
    useFactory: () => {
        return cloudinary.config({
            cloud_name: 'ddhbygccz',
            api_key: '636942678911383',
            api_secret: 'TD4RfgoGU4LepnnhD5uGkHB8kqc'
        })
    }
}
