// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');
    
    // Время загрузки (3-4 секунды)
    const loadingTime = Math.random() * 1000 + 3000; // От 3 до 4 секунд
    
    // Функция для завершения загрузки
    function completeLoading() {
        // Добавляем класс для анимации исчезновения лоадера
        loader.classList.add('fade-out');
        
        // Через небольшую задержку показываем главную страницу
        setTimeout(() => {
            // Скрываем лоадер
            loader.style.display = 'none';
            
            // Показываем главную страницу
            mainContent.classList.remove('hidden');
            mainContent.classList.add('fade-in');
            
            // Восстанавливаем возможность скролла
            document.body.style.overflow = 'auto';
        }, 500); // Задержка для плавного перехода
    }
    
    // Запускаем таймер загрузки
    setTimeout(completeLoading, loadingTime);
    
    // Дополнительная проверка на случай быстрой загрузки
    window.addEventListener('load', function() {
        // Если все ресурсы загружены, но таймер еще не сработал
        // ждем минимум 2 секунды для показа лоадера
        const minLoadingTime = 2000;
        const elapsedTime = Date.now() - performance.timing.navigationStart;
        
        if (elapsedTime < minLoadingTime) {
            setTimeout(completeLoading, minLoadingTime - elapsedTime);
        }
    });
    
    // Обработка ошибок загрузки
    window.addEventListener('error', function() {
        // В случае ошибки все равно показываем главную страницу
        setTimeout(completeLoading, 1000);
    });
});
