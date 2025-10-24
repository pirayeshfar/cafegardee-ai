import type { Recipe } from '../types';

export const recipes: Recipe[] = [
  {
    id: 1,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1579954115545-b7cd9299d646?q=80&w=800&auto=format&fit=crop',
    en: {
      name: 'Perfect Iced Latte',
      description: 'A creamy and refreshing coffee classic, perfect for a warm day.',
      ingredients: ['1-2 shots of espresso', '1 cup of milk (any kind)', 'Ice cubes', 'Sweetener to taste (optional)'],
      instructions: [
        'Fill a tall glass with ice cubes.',
        'Brew 1-2 shots of fresh espresso.',
        'If using sweetener, stir it into the hot espresso until dissolved.',
        'Pour the espresso over the ice.',
        'Slowly pour the milk over the espresso and ice.',
        'Stir gently and enjoy immediately.'
      ]
    },
    fa: {
      name: 'آیس لاته عالی',
      description: 'یک قهوه کلاسیک، خامه‌ای و با طراوت، مناسب برای یک روز گرم.',
      ingredients: ['۱-۲ شات اسپرسو', '۱ فنجان شیر (هر نوعی)', 'تکه‌های یخ', 'شیرین‌کننده به میزان دلخواه (اختیاری)'],
      instructions: [
        'یک لیوان بلند را با تکه‌های یخ پر کنید.',
        '۱ تا ۲ شات اسپرسوی تازه دم کنید.',
        'اگر از شیرین‌کننده استفاده می‌کنید، آن را در اسپرسوی داغ هم بزنید تا حل شود.',
        'اسپرسو را روی یخ‌ها بریزید.',
        'شیر را به آرامی روی اسپرسو و یخ بریزید.',
        'به آرامی هم بزنید و بلافاصله میل کنید.'
      ]
    }
  },
  {
    id: 2,
    category: 'herbal',
    image: 'https://images.unsplash.com/photo-1600181933052-f671df99d75b?q=80&w=800&auto=format&fit=crop',
    en: {
      name: 'Classic Virgin Mojito',
      description: 'A zesty and invigorating non-alcoholic drink that will transport you to the tropics.',
      ingredients: ['10-12 fresh mint leaves', '1/2 lime, cut into wedges', '2 tbsp sugar or simple syrup', 'Crushed ice', 'Soda water'],
      instructions: [
        'Place mint leaves and one lime wedge into a sturdy glass.',
        'Use a muddler to crush the mint and lime to release their oils.',
        'Add two more lime wedges and the sugar, and muddle again.',
        'Fill the glass almost to the top with crushed ice.',
        'Pour soda water over the ice.',
        'Stir, taste, and add more sugar if needed. Garnish with a lime wedge and mint sprig.'
      ]
    },
    fa: {
      name: 'موهیتو کلاسیک بدون الکل',
      description: 'یک نوشیدنی تند و نیروبخش غیرالکلی که شما را به مناطق استوایی می‌برد.',
      ingredients: ['۱۰-۱۲ برگ نعناع تازه', '۱/۲ لیمو ترش، قاچ شده', '۲ قاشق غذاخوری شکر یا شربت ساده', 'یخ خرد شده', 'آب گازدار (سودا)'],
      instructions: [
        'برگ‌های نعناع و یک قاچ لیمو را در یک لیوان محکم قرار دهید.',
        'با استفاده از یک مودلر (گوشت‌کوب)، نعناع و لیمو را له کنید تا عصاره آن‌ها خارج شود.',
        'دو قاچ دیگر لیمو و شکر را اضافه کرده و دوباره له کنید.',
        'لیوان را تقریباً تا بالا با یخ خرد شده پر کنید.',
        'آب گازدار را روی یخ بریزید.',
        'هم بزنید، بچشید و در صورت نیاز شکر بیشتری اضافه کنید. با یک قاچ لیمو و شاخه نعناع تزئین کنید.'
      ]
    }
  },
  {
    id: 3,
    category: 'tea',
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f2378f19?q=80&w=800&auto=format&fit=crop',
    en: {
      name: 'Moroccan Mint Tea',
      description: 'A sweet, fragrant, and traditional tea that is the heart of Moroccan hospitality.',
      ingredients: ['1 tbsp Chinese gunpowder green tea', 'A large handful of fresh spearmint', '3-4 tbsp sugar (or to taste)', '1 liter boiling water'],
      instructions: [
        'Put the green tea in a teapot. Add a splash of boiling water, swirl for 30 seconds, and pour it out to rinse the tea.',
        'Add the fresh mint and sugar to the teapot.',
        'Fill the teapot with the rest of the boiling water.',
        'Let it steep for 3-5 minutes.',
        'To serve, pour the tea into a glass and then pour it back into the pot. Repeat 2-3 times to mix.',
        'Pour from a height to create a nice foam. Enjoy hot.'
      ]
    },
    fa: {
      name: 'چای نعناع مراکشی',
      description: 'یک چای شیرین، معطر و سنتی که قلب مهمان‌نوازی مراکشی است.',
      ingredients: ['۱ قاشق غذاخوری چای سبز باروتی چینی', 'یک مشت بزرگ نعناع تازه', '۳-۴ قاشق غذاخوری شکر (یا به میزان دلخواه)', '۱ لیتر آب جوش'],
      instructions: [
        'چای سبز را در قوری بریزید. کمی آب جوش اضافه کنید، ۳۰ ثانیه بچرخانید و آن را خالی کنید تا چای شسته شود.',
        'نعناع تازه و شکر را به قوری اضافه کنید.',
        'بقیه آب جوش را در قوری بریزید.',
        'اجازه دهید ۳ تا ۵ دقیقه دم بکشد.',
        'برای سرو، چای را در یک لیوان بریزید و سپس آن را به قوری برگردانید. این کار را ۲-۳ بار تکرار کنید تا مخلوط شود.',
        'از ارتفاع بلند بریزید تا کف خوبی ایجاد شود. داغ میل کنید.'
      ]
    }
  },
   {
    id: 4,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1589138096926-2591e08e6f1a?q=80&w=800&auto=format&fit=crop',
    en: {
      name: 'Dalgona Coffee',
      description: 'A viral whipped coffee sensation that is as fun to make as it is to drink.',
      ingredients: ['2 tbsp instant coffee', '2 tbsp granulated sugar', '2 tbsp hot water', '1 cup of milk (hot or cold)'],
      instructions: [
        'In a medium bowl, combine instant coffee, sugar, and hot water.',
        'Using a hand mixer or a whisk, beat the mixture until it becomes thick, frothy, and light brown.',
        'Fill a glass with milk (cold with ice, or hot).',
        'Spoon the whipped coffee mixture on top of the milk.',
        'Stir before drinking to combine. Enjoy!'
      ]
    },
    fa: {
      name: 'قهوه دالگونا',
      description: 'یک حس قهوه هم‌زده ویروسی که درست کردنش به اندازه نوشیدنش سرگرم‌کننده است.',
      ingredients: ['۲ قاشق غذاخوری قهوه فوری', '۲ قاشق غذاخوری شکر', '۲ قاشق غذاخوری آب داغ', '۱ فنجان شیر (سرد یا گرم)'],
      instructions: [
        'در یک کاسه متوسط، قهوه فوری، شکر و آب داغ را با هم مخلوط کنید.',
        'با استفاده از همزن دستی یا یک ویسک، مخلوط را هم بزنید تا غلیظ، کف‌آلود و به رنگ قهوه‌ای روشن درآید.',
        'یک لیوان را با شیر (سرد با یخ، یا داغ) پر کنید.',
        'مخلوط قهوه هم‌زده را با قاشق روی شیر قرار دهید.',
        'قبل از نوشیدن هم بزنید تا مخلوط شود. نوش جان!'
      ]
    }
  }
];
