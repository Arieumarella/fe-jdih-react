import React from 'react';
import { Helmet } from 'react-helmet-async';

const MetaTags = ({
    title = "JDIH - Jaringan Dokumentasi dan Informasi Hukum Kementerian Pekerjaan Umum",
    description = "Website resmi Jaringan Dokumentasi dan informasi hukum, membantu kamu mencari peraturan di Pekerjaan Umum",
    keywords = "JDIH Pekerjaan Umum",
    url = "https://jdih.pu.go.id",
    image = "https://jdih.pu.go.id/assets/img/core-img/logopupr2.png",
    ogType = "website"
}) => {
    // Dapatkan URL saat ini jika tidak disediakan secara eksplisit,
    // namun lebih baik mengirimkannya sebagai prop untuk konsistensi, terutama untuk canonical URL.
    const currentUrl = typeof window !== 'undefined' ? window.location.href : url;

    return (
        <Helmet>
            {/* General tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={currentUrl} /> {/* Penting untuk SEO */}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter (opsional, tapi baik untuk dimiliki) */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={currentUrl} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
        </Helmet>
    );
};

export default MetaTags;