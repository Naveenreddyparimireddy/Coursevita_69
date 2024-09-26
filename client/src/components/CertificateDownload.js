import React from 'react';

const CertificateDownload = ({ certificateUrl }) => {
    return (
        <div>
            <a href={certificateUrl} download="Certificate.pdf">
                <button>Download Certificate</button>
            </a>
        </div>
    );
};

export default CertificateDownload;
