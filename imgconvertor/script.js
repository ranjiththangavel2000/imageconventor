document.addEventListener('DOMContentLoaded', function () {
    const imageInput = document.getElementById('imageInput');
    const formatSelect = document.getElementById('formatSelect');
    const convertBtn = document.getElementById('convertBtn');
    const outputImage = document.getElementById('outputImage');
    const downloadBtn = document.getElementById('downloadBtn');

    convertBtn.addEventListener('click', function () {
        const file = imageInput.files[0];
        const format = formatSelect.value;

        if (file && format) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.src = e.target.result;

                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);

                    const dataURL = canvas.toDataURL(`image/${format}`);
                    outputImage.innerHTML = `<img src="${dataURL}" alt="Converted Image">`;
                    downloadBtn.href = dataURL;
                    downloadBtn.download = `converted_image.${format}`;
                    downloadBtn.style.display = 'block';
                };
            };

            reader.readAsDataURL(file);
        } else {
            alert('Please select an image file and choose a format.');
        }
    });

    downloadBtn.addEventListener('click', function () {
        if (!downloadBtn.href) {
            alert('No image to download.');
        }
    });
});
