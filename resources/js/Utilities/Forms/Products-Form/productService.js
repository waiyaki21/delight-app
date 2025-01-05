import axios from 'axios';

export const getProduct = async (flashClickShow) => {
    try {
        const { data } = await axios.get('/api/getNewProduct/');
        const link = `/product_show/${data.id}`;
        const header = `Upload Successful!`;
        const button = `View Product`;
        const message = `${data.name} Uploaded Successfully`;
        flashClickShow(message, 'success', header, link, button, 15000);
        return data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};

export const submitThumbnail = async (id, thumbnailFiles, flashTimed, flash) => {
    const config = {
        headers: { 'content-type': 'multipart/form-data' },
    };

    for (const file of thumbnailFiles) {
        const data = new FormData();
        data.append('thumbnail', file);

        try {
            await axios.post(`/product/thumbnail/add/${id}`, data, config);
            const message = `Thumbnail: ${file.name} (${(file.size / 1e6).toFixed(2)} MB) uploaded successfully!`;
            flashTimed(message, 'media', 20000);
        } catch (err) {
            const message = `${file.name} (${(file.size / 1e6).toFixed(2)} MB) upload failed!`;
            flash(message, 'danger');
        }
    }
};

export const submitProductFiles = async (id, productFiles, flashTimed, flashShow) => {
    const config = {
        headers: { 'content-type': 'multipart/form-data' },
    };

    for (const file of productFiles) {
        const data = new FormData();
        data.append('file', file);

        try {
            await axios.post(`/product/files/add/${id}`, data, config);
            const message = `${file.name} (${(file.size / 1e6).toFixed(2)} MB) uploaded successfully!`;
            flashTimed(message, 'media', 10000);
        } catch (err) {
            const message = `${file.name} (${(file.size / 1e6).toFixed(2)} MB) upload failed!`;
            flashShow(message, 'danger');
        }
    }
};

export const submitProduct = async (fields, thumbnailFiles, productFiles, utilities, flash, flashTimed, flashShow, reloadProducts, successToggle, failureToggle, reload) => {
    try {
        const formInfo = utilities.loading();
        const response = await axios.post('/product/add', fields);

        // Reset form fields
        const id = response.data[2];

        // Submit thumbnail
        await submitThumbnail(id, thumbnailFiles, flashTimed, flash);

        // Submit product files
        await submitProductFiles(id, productFiles, flashTimed, flashShow);

        // Fetch the updated product list
        await getProduct(flash);

        // Mark success
        utilities.success();
        successToggle();
        setTimeout(reload, 10000);
        reloadProducts();
    } catch (error) {
        failureToggle();
        if (error.response?.status === 422) {
            const errors = error.response.data.errors || {};
            for (const key in errors) {
                for (const message of errors[key]) {
                    flash(message, 'danger');
                }
            }
        }
        throw error;
    }
};
