/* ============================================================
   Все данные компании, которые нужно поменять, — здесь.
   ШАБЛОН: название, телефон, адрес, почта, часы и соцсети —
   вымышленные заглушки, подставить данные заказчика
   (см. DEMO-CHECKLIST.md).
   RO-версия (ro.html) берёт поля с суффиксом _ro, если они есть.
   ============================================================ */
window.SITE = {
  brand: "PRINTLAB",

  phone: { tel: "+37360000000", label: "+373 60 000 000" },
  email: "info@example.md",

  address: "Кишинёв, ул. Примерная 1",
  address_ro: "Chișinău, str. Exemplu 1",

  // Коротко — в верхней полосе шапки
  hoursShort: "Пн-Пт: 9:00 - 18:00, Сб: 10:00 - 14:00",
  hoursShort_ro: "Lu-Vi: 9:00 - 18:00, Sâ: 10:00 - 14:00",
  // Подробно — в блоке «Контакты», по строке на элемент
  hours: ["Пн-Пт: 9:00 - 18:00", "Сб: 10:00 - 14:00", "Вс: выходной"],
  hours_ro: ["Lu-Vi: 9:00 - 18:00", "Sâ: 10:00 - 14:00", "Du: zi liberă"],

  // Кнопка «Открыть на карте»: что искать в Google Maps
  mapQuery: "Chișinău",

  viber: "viber://chat?number=%2B37360000000",
  telegram: "https://t.me/",
  whatsapp: "https://wa.me/37360000000"
};

/* Подстановка данных в разметку. В HTML уже стоят те же значения —
   страница читается и без JS; скрипт лишь держит всё в одном месте.
   data-site="ключ"       → текст элемента (массив — строки через <br>)
   data-site-href="ключ"  → href ссылки (phone → tel:, email → mailto:, map → Google Maps) */
(function () {
  var S = window.SITE;
  var ro = document.documentElement.lang === "ro";

  function get(key) {
    if (ro && S[key + "_ro"] != null) return S[key + "_ro"];
    return S[key];
  }

  var text = {
    phone: function () { return S.phone.label; },
    year: function () { return String(new Date().getFullYear()); }
  };
  var href = {
    phone: function () { return "tel:" + S.phone.tel; },
    email: function () { return "mailto:" + S.email; },
    map: function () { return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(S.mapQuery); }
  };

  document.querySelectorAll("[data-site]").forEach(function (el) {
    var key = el.getAttribute("data-site");
    var val = text[key] ? text[key]() : get(key);
    if (val == null) return;
    if (Array.isArray(val)) {
      el.textContent = "";
      val.forEach(function (line, i) {
        if (i) el.appendChild(document.createElement("br"));
        el.appendChild(document.createTextNode(line));
      });
    } else {
      el.textContent = val;
    }
  });

  document.querySelectorAll("[data-site-href]").forEach(function (el) {
    var key = el.getAttribute("data-site-href");
    var val = href[key] ? href[key]() : get(key);
    if (val) el.setAttribute("href", val);
  });
})();
