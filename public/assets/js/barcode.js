/* tppit.ru — отрисовка EAN-13 (SVG) + интерактив форм проверки.
   Штрих-код — честный: L/G/R-паттерны, контрольная цифра по стандарту GS1. */
(function () {
  'use strict';

  var L = ['0001101','0011001','0010011','0111101','0100011','0110001','0101111','0111011','0110111','0001011'];
  var G = ['0100111','0110011','0011011','0100001','0011101','0111001','0000101','0010001','0001001','0010111'];
  var PARITY = ['LLLLLL','LLGLGG','LLGGLG','LLGGGL','LGLLGG','LGGLLG','LGGGLL','LGLGLG','LGLGGL','LGGLGL'];
  var R = L.map(function (p) {
    return p.split('').map(function (b) { return b === '1' ? '0' : '1'; }).join('');
  });

  function checkDigit(d12) {
    var s = 0;
    for (var i = 0; i < 12; i++) s += (+d12[i]) * (i % 2 ? 3 : 1);
    return String((10 - s % 10) % 10);
  }

  /* Модули для (возможно неполного) кода. Возвращает массив
     [{x, w, tall}] в модульных координатах + подписи цифр. */
  function modules(digits) {
    var mods = [], x = 0, i, j, pat, bit;
    function push(bits, tall) {
      for (j = 0; j < bits.length; j++, x++) {
        if (bits[j] === '1') mods.push({ x: x, tall: !!tall });
      }
    }
    push('101', true); // левый ограничитель
    var parity = PARITY[+(digits[0] || '4')];
    for (i = 1; i <= 6; i++) {
      pat = digits[i] === undefined ? null : (parity[i - 1] === 'L' ? L : G)[+digits[i]];
      if (pat) push(pat); else x += 7;
    }
    push('01010', true); // центральный
    for (i = 7; i <= 12; i++) {
      pat = digits[i] === undefined ? null : R[+digits[i]];
      if (pat) push(pat); else x += 7;
    }
    push('101', true); // правый
    return mods;
  }

  /* SVG штрих-кода. digits — строка 0-13 цифр. */
  function svg(digits, color) {
    color = color || 'currentColor';
    var u = 3, H = 66, TALL = 74, TOP = 6, W = (95 + 14) * u; // 95 модулей + поля
    var pad = 7 * u; // свободная зона
    var out = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + (TALL + 26) + '" role="img" aria-label="Штрих-код EAN-13' + (digits.length === 13 ? ' ' + digits : '') + '">'];
    modules(digits).forEach(function (m) {
      out.push('<rect x="' + (pad + m.x * u) + '" y="' + TOP + '" width="' + u + '" height="' + (m.tall ? TALL : H) + '" fill="' + color + '"/>');
    });
    // подписи цифр
    var fs = 13, ty = TALL + TOP + 14;
    var t = function (x, s, anchor) {
      out.push('<text x="' + x + '" y="' + ty + '" font-family="IBM Plex Mono,monospace" font-size="' + fs + '" letter-spacing="2"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + ' fill="' + color + '">' + s + '</text>');
    };
    if (digits[0]) t(0, digits[0]);
    if (digits.length > 1) t(pad + 3 * u + 21 * u, digits.slice(1, 7), 'middle');
    if (digits.length > 7) t(pad + 3 * u + 46 * u + 21 * u, digits.slice(7, 13), 'middle');
    out.push('</svg>');
    return out.join('');
  }

  window.EAN13 = { svg: svg, checkDigit: checkDigit };

  /* --- Живой штрих-код в герое --- */
  document.addEventListener('DOMContentLoaded', function () {
    var live = document.querySelector('[data-barcode-live]');
    var input = document.querySelector('[data-code-input]');
    var demo = '460123456789';
    demo += checkDigit(demo);

    function draw(v) {
      if (!live) return;
      var d = (v || '').replace(/\D/g, '').slice(0, 13);
      live.innerHTML = svg(d.length ? d : demo, 'var(--ink)');
      var cap = document.querySelector('[data-barcode-caption]');
      if (cap) {
        if (!d.length) cap.textContent = 'пример: ' + demo;
        else if (d.length < 13) cap.textContent = d + ' · ещё ' + (13 - d.length) + ' цифр';
        else cap.textContent = checkDigit(d.slice(0, 12)) === d[12] ? d + ' · контрольная цифра верна' : d + ' · контрольная цифра не сходится';
      }
    }
    draw(input && input.value);
    if (input) input.addEventListener('input', function () { draw(input.value); });

    /* Подсказка контрольной цифры в форме проверки */
    var hint = document.querySelector('[data-code-hint]');
    if (input && hint) {
      input.addEventListener('input', function () {
        var d = input.value.replace(/\D/g, '');
        hint.classList.remove('err');
        if (d.length === 13 && checkDigit(d.slice(0, 12)) !== d[12]) {
          hint.textContent = 'Контрольная цифра не сходится — проверьте номер. Поиск всё равно возможен.';
          hint.classList.add('err');
        } else {
          hint.textContent = hint.dataset.default || '';
        }
      });
    }

    /* Печатные штрих-коды в результатах (рендер по data-атрибуту) */
    document.querySelectorAll('[data-barcode]').forEach(function (el) {
      var d = (el.getAttribute('data-barcode') || '').replace(/\D/g, '');
      if (d.length === 13) el.innerHTML = svg(d, 'var(--ink)');
    });

    /* --- Вкладки «по коду / по ИНН» --- */
    var tabs = document.querySelectorAll('.check-tabs button');
    tabs.forEach(function (btn) {
      btn.addEventListener('click', function () {
        tabs.forEach(function (b) {
          b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
          var panel = document.getElementById(b.getAttribute('aria-controls'));
          if (panel) panel.hidden = b !== btn;
        });
        var panel = document.getElementById(btn.getAttribute('aria-controls'));
        var field = panel && panel.querySelector('input[type="text"]');
        if (field) field.focus();
      });
    });
  });
})();
