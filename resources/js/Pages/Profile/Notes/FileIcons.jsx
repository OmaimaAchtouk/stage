import React from 'react';
import DescriptionIcon from '@mui/icons-material/Description'; // Generic document icon
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleIcon from '@mui/icons-material/Article'; // Used for Word documents
import TableChartIcon from '@mui/icons-material/TableChart'; // Used for Excel spreadsheets
import SlideshowIcon from '@mui/icons-material/Slideshow'; // Used for PowerPoint presentations

const getFileIcon = (fileType) => {
    switch (fileType) {
        case 'image/jpeg':
        case 'image/png':
        case 'image/gif':
            return <ImageIcon style={{ color: 'blue' }} />;
        case 'application/pdf':
            return <PictureAsPdfIcon style={{ color: 'red' }} />;
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return <ArticleIcon style={{ color: 'green' }} />;
        case 'application/vnd.ms-excel':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return <TableChartIcon style={{ color: 'orange' }} />;
        case 'application/vnd.ms-powerpoint':
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
            return <SlideshowIcon style={{ color: 'purple' }} />;
        default:
            return <DescriptionIcon style={{ color: 'black' }} />;
    }
}

export default getFileIcon;
