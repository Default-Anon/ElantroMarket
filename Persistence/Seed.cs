using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,UserManager<AppUser> userManager)
        {
            if (!context.Products.Any())
            {
                var products = new List<Product>
                {
                    new Product
                    {
                        ProductId = Guid.NewGuid(),
                        Description = "i7 7700k Techno",
                        Category = "Компьютеры",
                        Images = new List<Image>{
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/685/98/new_71568598_l_1604737760.jpeg"},
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/685/98/new_71568598_l_1604737797.jpeg"}
                        },
                        Name = "SONY Computer",
                        Price = "50000",
                        Title = "Sony computer high level class",
                        MainImage = "https://static.eldorado.ru/photos/71/715/685/98/new_71568598_l_1604737760.jpeg"
                    },
                    new Product
                    {
                        ProductId = Guid.NewGuid(),
                        Description = "Good gadget for work and games",
                        Category = "Смартфоны",
                        Images = new List<Image>{
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/685/98/new_71568598_l_1604737760.jpeg"},
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/685/98/new_71568598_l_1604737797.jpeg"}
                        },
                        Name = "Nokia 1.3",
                        Price = "28500",
                        Title = "Смартфон Nokia 1.3",
                        MainImage = "https://static.eldorado.ru/photos/71/715/685/98/new_71568598_l_1604737760.jpeg"
                    },
                    new Product
                    {
                        ProductId = Guid.NewGuid(),
                        Description = "Good gadget for home",
                        Category = "Пылесосы",
                        Images = new List<Image>{
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/685/98/new_71568598_l_1604737760.jpeg"},
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/685/98/new_71568598_l_1604737797.jpeg"}
                        },
                        Name = "LG 104-32 Model B",
                        Price = "25000",
                        Title = "Xiaomi Redmi 4x",
                        MainImage = "https://static.eldorado.ru/photos/71/715/685/98/new_71568598_l_1604737760.jpeg"
                    },
                    new Product
                    {
                        ProductId = Guid.NewGuid(),
                        Description = "Пылесос LG VC5316BNSAF снабжен эллиптическим циклонным фильтром, сохраняющим высокую силу всасывания при длительной работе. Он собирает мусор в практичный пластиковый контейнер, позволяя обходиться без одноразовых мешков. К нему прилагается микрофильтр, который задерживает более 90% мелкой пыли и других аллергенов. Благодаря этому в доме создается комфортная здоровая обстановка.Большие колеса с прорезиненным покрытием делают пылесос LG VC5316BNSAF маневренным, устойчивым и безопасным для чувствительных материалов. Широкая ручка позволяет быстро переносить его между комнатами. Он укомплектован тремя насадками — универсальной щеткой для пола и ковров, инструментом для чистки мебели и щелевой трубкой для уборки в труднодоступных местах.",
                        Category = "Пылесосы",
                        Images = new List<Image>{
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/685/98/new_71568598_l_1604737760.jpeg"},
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/685/98/new_71568598_l_1604737797.jpeg"}
                        },
                        Name = "LG VC5316BNSAF",
                        Price = "5199",
                        Title = "Пылесос LG VC5316BNSAF",
                        MainImage = "https://static.eldorado.ru/photos/71/715/685/98/new_71568598_l_1604737760.jpeg"
                    },
                    new Product
                    {
                        ProductId = Guid.NewGuid(),
                        Description = "Good gadget for work and games",
                        Category = "Phone",
                        Images = new List<Image>{
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/685/98/new_71568598_l_1604737760.jpeg"},
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/685/98/new_71568598_l_1604737797.jpeg"},
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/685/98/new_71568598_l_1604737760.jpeg"},
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/685/98/new_71568598_l_1604737797.jpeg"},
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/685/98/new_71568598_l_1604737760.jpeg"},
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/685/98/new_71568598_l_1604737797.jpeg"},
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/685/98/new_71568598_l_1604737797.jpeg"}
                        },
                        Name = "Nokia 8.3",
                        Price = "43000",
                        Title = "Смартфон Nokia 8.3 128GB Blue (TA-1243)",
                        MainImage = "https://static.eldorado.ru/photos/71/715/685/98/new_71568598_l_1604737760.jpeg"
                    },
                    new Product
                    {
                        ProductId = Guid.NewGuid(),
                        Description = "Ноутбук для серфинга в интернете.Быстрый благодаря ssd,стильный и имеющий на борту 4 гб озу и процессор Pentium silver N5030,а также разрешение экрана 1920*1080 точек.",
                        Category = "Ноутбуки",
                        Images = new List<Image>{
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/723/13/new_71572313_l_1605697031.jpeg"},
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/723/13/new_71572313_l_1605697285.jpeg"},
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/723/13/new_71572313_l_1605697031.jpeg"},
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/723/13/new_71572313_l_1605697285.jpeg"},
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/723/13/new_71572313_l_1605697031.jpeg"},
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/723/13/new_71572313_l_1605697285.jpeg"},
                        },
                        Name = "Acer Swift 1 SF114-33-P06A",
                        Price = "33999",
                        Title = "Ультрабук Acer Swift 1 SF114-33-P06A",
                        MainImage = "https://static.eldorado.ru/photos/71/715/723/13/new_71572313_l_1605697031.jpeg"
                    },
                    new Product
                    {
                        ProductId = Guid.NewGuid(),
                        Description = "Смартфон Redmi Note 9 Pro 128GB Grey оснащен фотомодулем из четырех камер с 64-мегапиксельной матрицей основного объектива." +
                        "Такая система позволяет создавать детализированные изображения, снимать великолепные панорамы и портреты с эффектом боке, получать качественные макроснимки и записывать видео в разрешении 4K." +
                        "С легкостью делать селфи, в том числе с эффектом слоу-мо, помогает 16-мегапиксельная фронтальная камера, при работе которой применяются алгоритмы искусственного интеллекта.Высокое быстродействие смартфона Redmi Note 9 Pro 128GB Grey обеспечивает производительный восьмиядерный процессор Qualcomm Snapdragon 720G и оперативная память на 6 ГБ. Внутренний накопитель располагает емкостью 128 ГБ. К нему можно добавить microSD карту вместимостью до 512 ГБ.Смартфон Redmi Note 9 Pro 128GB Grey отличается безупречным симметричным дизайном как задней стороны, так и 6,67-дюймового дисплея. Аккумулятор на 5020 мА*ч позволяет непрерывно слушать музыку на протяжении более чем 6 суток, до 33 часов общаться по голосовой связи или до 16 часов пользоваться гаджетом как навигатором.",
                        Category = "Смартфоны",
                        Images = new List<Image>{
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/496/14/new_71549614_l_1590668442.jpeg"},
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/496/14/new_71549614_l_1590668561.jpeg"}
                        },
                        Name = "Xiaomi Redmi Note 9 Pro",
                        Price = "20000",
                        Title = "Смартфон Xiaomi Redmi Note 9 Pro 128GB Grey",
                        MainImage = "https://static.eldorado.ru/photos/71/715/496/14/new_71549614_l_1590668442.jpeg",
                    },
                    new Product
                    {
                        ProductId = Guid.NewGuid(),
                        Description = "Телевизор Hi 32HT101X — хороший выбор для небольшой гостиной. " +
                        "Его 31,5-дюймовый экран с разрешением 1366х768 пикселей воспроизводит четкую, яркую, детализированную картинку. " +
                        "Тонкая рамка не отвлекает вас от просмотра и помогает этой модели выглядеть особенно элегантно. " +
                        "Экран создан на основе матрицы IPS, произведенной компанией Panasonic. " +
                        "Она обеспечивает реалистичную цветопередачу, а углы обзора достигают 176°, и изображение не искажается, если вы смотрите на него со стороны." +
                        "Модель Hi 32HT101X оборудована тюнером DVB-T2 и слотом CI+." +
                        "Это значит, что он принимает передачи цифрового ТВ, а при установке CAM-модуля вам будут доступны закрытые (платные) пакеты цифровых каналов." +
                        "Разъемы HDMI и USB позволяют подключать флешки и внешние жесткие диски, игровую приставку и DVD-плеер. " +
                        "Встроенный медиаплеер поддерживает множество кодеков, поэтому он легко прочитает файлы практически любого формата и воспроизведет фотографию или видеоролик." +
                        "Телевизор Hi 32HT101X предлагает владельцу множество дополнительных возможностей." +
                        " С помощью функции TimeShift вы поставите фильм, шоу или спортивную передачу на «паузу», а потом досмотрите их в удобное время." +
                        " Поддержка технологии MHL обеспечивает простое взаимодействие с совместимыми смартфонами и планшетами: подсоединяйте мобильные устройства," +
                        " чтобы выводить с них мультимедийный контент на большой яркий экран.",
                        Category = "Телевизоры",
                        Images = new List<Image>{
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/110/97/new_71511097_l_1553592355.jpeg"},
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/110/97/new_71511097_l_1555491169.jpeg"},
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/110/97/new_71511097_l_1555491292.jpeg"},
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/110/97/new_71511097_l_1564664868.jpeg"},
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/110/97/new_71511097_l_1564664875.jpeg"},
                            new Image {ImageId = Guid.NewGuid(),imageUrl = "https://static.eldorado.ru/photos/71/715/110/97/new_71511097_l_1564664909.jpeg"},
                        },
                        MainImage = "https://static.eldorado.ru/photos/71/715/110/97/new_71511097_l_1553592355.jpeg",
                        Name = "Hi 32HT101X",
                        Price = "30000",
                        Title = "LED телевизор 31.5 Hi 32HT101X"
                    }
                };
                context.Products.AddRange(products);
                if (!userManager.Users.Any())
                {
                    var users = new List<AppUser>
                    {
                        new AppUser
                        {
                            DisplayName = "Admin",
                            Email = "admin@test.com",
                            UserName = "admin",
                            Role = "admin"
                        },
                        new AppUser
                        {
                            DisplayName = "Vurdalak",
                            Email = "vurdalak@test.com",
                            UserName = "vurdalak"
                        }
                    };
                    foreach(var user in users)
                    {
                        await userManager.CreateAsync(user, "Pa$$w0rd");
                    }
                }
                var result = await context.SaveChangesAsync() > 0;
                if (!result)
                {
                    throw new Exception("Database save changes Error");
                }
            }
        }
    }
}
