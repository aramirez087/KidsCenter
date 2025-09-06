// Structured Data for SEO
export const structuredData = {
    localBusiness: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://kidscenter.cr/#organization",
        "name": "Kids Center Costa Rica",
        "alternateName": "Kids Center CR",
        "description": "Centro especializado en terapia de lenguaje, enseñanza de idiomas y refuerzo académico para niños de 0 a 12 años en San José, Costa Rica.",
        "url": "https://kidscenter.cr",
        "logo": "https://kidscenter.cr/images/logo.jpg",
        "image": "https://kidscenter.cr/images/logo.jpg",
        "telephone": "+506-2234-5678",
        "email": "info@kidscenter.cr",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Avenida Central 123",
            "addressLocality": "San José",
            "addressRegion": "SJ",
            "postalCode": "10101",
            "addressCountry": "CR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 9.9281,
            "longitude": -84.0907
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:00",
                "closes": "18:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "09:00",
                "closes": "13:00"
            }
        ],
        "sameAs": [
            "https://www.instagram.com/kidscentercr/"
        ],
        "priceRange": "$$",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "reviewCount": "47"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Servicios de Kids Center",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Terapia de Lenguaje",
                        "description": "Evaluación y tratamiento especializado para el desarrollo del lenguaje y habla en niños."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Clases de Idiomas",
                        "description": "Enseñanza de inglés, alemán, portugués y español para niños con metodología lúdica."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Refuerzo Académico",
                        "description": "Apoyo personalizado en materias escolares y técnicas de estudio."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Estimulación Temprana",
                        "description": "Programa de desarrollo integral para bebés y niños pequeños de 0 a 3 años."
                    }
                }
            ]
        }
    },
    
    faqPage: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "¿A partir de qué edad pueden asistir los niños a Kids Center?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Atendemos niños desde los 6 meses hasta los 12 años. Nuestros programas están diseñados específicamente para cada grupo de edad, asegurando el desarrollo óptimo en cada etapa."
                }
            },
            {
                "@type": "Question",
                "name": "¿Cuánto dura cada sesión de terapia de lenguaje?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Las sesiones individuales duran 45-50 minutos, mientras que las sesiones grupales son de 60 minutos. La duración se adapta según la edad y necesidades del niño."
                }
            },
            {
                "@type": "Question",
                "name": "¿Cómo sé si mi hijo necesita terapia de lenguaje?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Algunos signos incluyen: dificultad para pronunciar palabras, vocabulario limitado para su edad, problemas para seguir instrucciones, o frustración al comunicarse. Ofrecemos una evaluación gratuita para determinar las necesidades específicas."
                }
            },
            {
                "@type": "Question",
                "name": "¿Trabajan con el seguro médico?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sí, trabajamos con la mayoría de los seguros médicos privados. También ofrecemos planes de pago flexibles para familias sin cobertura de seguro."
                }
            },
            {
                "@type": "Question",
                "name": "¿Cuánto tiempo toma ver resultados en la terapia?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Cada niño es único, pero generalmente los padres notan mejoras significativas entre las 8-12 semanas. El progreso depende de la consistencia en las sesiones y la práctica en casa."
                }
            },
            {
                "@type": "Question",
                "name": "¿Ofrecen sesiones virtuales?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sí, ofrecemos sesiones virtuales para familias que no pueden asistir presencialmente. Nuestras sesiones online son igual de efectivas y utilizan herramientas interactivas especializadas."
                }
            }
        ]
    },
    
    breadcrumbList: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": "https://kidscenter.cr"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Quiénes Somos",
                "item": "https://kidscenter.cr#nosotros"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Servicios",
                "item": "https://kidscenter.cr#servicios"
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": "Contacto",
                "item": "https://kidscenter.cr#contacto"
            }
        ]
    }
};

// Function to inject structured data into the page
export function injectStructuredData() {
    Object.values(structuredData).forEach(data => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
    });
}