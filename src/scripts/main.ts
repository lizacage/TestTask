import '../styles/main.scss'

const burger = document.getElementById('header__burger-btn');

function toggleBurger() {
    const menu = document.getElementById('header__burger-menu');
    const menuBg = document.getElementById('header__burger-menu-bg');

    if (menu && menuBg && burger) {
        if (menu.classList.contains('opened')) {
            menu.classList.remove('opened');
            menuBg.classList.remove('opened');
            burger.classList.remove('opened');
    
        } else {
            menu.classList.add('opened');
            menuBg.classList.add('opened');
            burger.classList.add('opened');
        }
    }
}

if (burger) {
    burger.addEventListener('click', toggleBurger);
}

const subscriptionsInit = () => {
    const subscriptionList = document.querySelectorAll<HTMLDivElement>('[data-subscription]');
    const subscriptionState = {
        currency: "usd",
        period: "month"
    }

    const subscriptionSwitcher = () => {
        subscriptionList.forEach((subscription: HTMLDivElement) => {
            const price = subscription.querySelector<HTMLDivElement>('[data-subscription-price]');
            const currency = subscription.querySelector<HTMLDivElement>('[data-subscription-currency]');
            const period = subscription.querySelector<HTMLDivElement>('[data-subscription-period]');
        
            if (price && currency && period) {
                const { rubPerDay, usdPerDay } = price.dataset;
        
                const dayPrice = subscriptionState.currency === "usd" ? usdPerDay : rubPerDay;
                const multiply = subscriptionState.period === "month" ? 30 : 1;
        
                currency.innerHTML = subscriptionState.currency === 'usd' ? "$" : "₽";
                period.innerHTML = subscriptionState.period === "month" ? "Month" : "Day";
                price.innerHTML = `${(Number(dayPrice) || 0) * multiply}`;
            }
        })
    }

    subscriptionList.forEach((item) => {
        const currency = item.querySelector<HTMLDivElement>('[data-subscription-currency]');
        const period = item.querySelector<HTMLDivElement>('[data-subscription-period]');

        currency?.addEventListener('click', () => {
            subscriptionState.currency = subscriptionState.currency === "usd" ? "rub" : "usd";

            subscriptionSwitcher();
        });

        period?.addEventListener('click', () => {
            subscriptionState.period = subscriptionState.period === "month" ? "day" : "month";

            subscriptionSwitcher();
        });
    });

    subscriptionSwitcher();
}

subscriptionsInit();