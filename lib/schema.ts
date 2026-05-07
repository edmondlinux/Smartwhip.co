const BASE_URL = process.env.BASE_URL || 'https://smartwhip.co';

export interface ProductSchemaInput {
  name: string;
  description: string;
  image: string;
  brandName: string;
  sku: string;
  price: string;
  casePrice?: string;
  url: string;
  ratingValue?: string;
  reviewCount?: string;
  areaServedCity?: string;
}

export function buildProductSchema(input: ProductSchemaInput) {
  const priceNum = parseFloat(input.price.replace('£', ''));

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    image: {
      '@type': 'ImageObject',
      url: input.image.startsWith('http') ? input.image : `${BASE_URL}${input.image}`,
      width: 800,
      height: 800,
    },
    brand: {
      '@type': 'Brand',
      name: input.brandName,
    },
    sku: input.sku,
    mpn: input.sku,
    url: input.url.startsWith('http') ? input.url : `${BASE_URL}${input.url}`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'GBP',
      price: priceNum.toFixed(2),
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      url: input.url.startsWith('http') ? input.url : `${BASE_URL}${input.url}`,
      seller: {
        '@type': 'Organization',
        name: 'SmartWhip UK',
        url: BASE_URL,
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'GBP',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'GB',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'HUR',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'HUR',
          },
        },
      },
      ...(input.areaServedCity && {
        areaServed: { '@type': 'City', name: input.areaServedCity },
      }),
    },
  };

  if (input.ratingValue && input.reviewCount) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: input.ratingValue,
      reviewCount: input.reviewCount,
      bestRating: '5',
      worstRating: '1',
    };
  }

  return schema;
}

export const PRODUCT_DEFINITIONS = [
  {
    name: 'SmartWhip',
    fullName: 'SmartWhip 640g N₂O Cream Charger Cylinder',
    description: '99.9% pure food-grade nitrous oxide. TUV certified. Europe\'s most trusted 640g cylinder for professional whipping and culinary applications.',
    image: '/products/smartwhip.jpeg',
    brandName: 'SmartWhip',
    sku: 'SW-640G-UK',
    price: '30.00',
    casePrice: '130.00',
    slug: 'smartwhip',
    ratingValue: '4.9',
    reviewCount: '312',
  },
  {
    name: 'FastGas',
    fullName: 'FastGas 640g N₂O Cream Charger Cylinder',
    description: 'CE & TUV certified 640g nitrous oxide cylinder. Praised by professional chefs for superior regulator control and consistent output.',
    image: '/products/fastgas.jpeg',
    brandName: 'FastGas',
    sku: 'FG-640G-UK',
    price: '32.00',
    casePrice: '138.00',
    slug: 'fastgas',
    ratingValue: '4.8',
    reviewCount: '198',
  },
  {
    name: 'Cream Deluxe',
    fullName: 'Cream Deluxe 640g N₂O Cream Charger Cylinder',
    description: 'CE certified 640g nitrous oxide cylinder. Competitive case pricing for high-volume catering operations. Consistent and reliable.',
    image: '/products/cream-deluxe.jpeg',
    brandName: 'Cream Deluxe',
    sku: 'CD-640G-UK',
    price: '30.00',
    casePrice: '128.00',
    slug: 'cream-deluxe',
    ratingValue: '4.8',
    reviewCount: '145',
  },
  {
    name: 'GoldWhip',
    fullName: 'GoldWhip 640g N₂O Cream Charger Cylinder',
    description: 'CE certified food-grade nitrous oxide at a highly competitive price point. Cross-brand compatible with all standard dispensers.',
    image: '/products/goldwhip.jpeg',
    brandName: 'GoldWhip',
    sku: 'GW-640G-UK',
    price: '29.00',
    casePrice: '124.00',
    slug: 'goldwhip',
    ratingValue: '4.7',
    reviewCount: '89',
  },
] as const;

export function buildItemListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'N₂O Cream Charger Cylinders — UK Delivery',
    description: 'Premium 640g food-grade nitrous oxide cream charger cylinders available for fast UK-wide delivery.',
    url: BASE_URL,
    numberOfItems: PRODUCT_DEFINITIONS.length,
    itemListElement: PRODUCT_DEFINITIONS.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: buildProductSchema({
        name: p.fullName,
        description: p.description,
        image: p.image,
        brandName: p.brandName,
        sku: p.sku,
        price: `£${p.price}`,
        url: `/order?brand=${encodeURIComponent(p.name)}`,
        ratingValue: p.ratingValue,
        reviewCount: p.reviewCount,
      }),
    })),
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SmartWhip UK',
    url: BASE_URL,
    description: 'The UK\'s #1 supplier for SmartWhip, FastGas, Cream Deluxe and GoldWhip 640g N₂O cream charger cylinders.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}
