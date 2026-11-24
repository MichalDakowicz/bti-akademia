BANK.frontend={name:'Technologie frontendowe',icon:'🎨',color:'#be185d',
intro:'HTML, CSS i JavaScript – ze szczególnym naciskiem na dziwactwa JS (typy, ==, event loop) oraz podstawy przeglądarki i HTTP. To kategoria, w której często pojawiają się „pułapki”.',
lessons:[
{h:'Model pudełkowy CSS (box model)',html:`
<figure class="diagram"><svg viewBox="0 0 520 280" width="520" role="img" aria-label="Box model">
<rect x="10" y="10" width="500" height="260" rx="8" fill="#fbd5a5" stroke="#d6a76a"/><text x="30" y="32" font-size="13" font-weight="700" style="fill:#7a4b00">margin (poza elementem, przezroczysty)</text>
<rect x="60" y="48" width="400" height="190" rx="6" fill="#f9e08a" stroke="#cfb23c"/><text x="76" y="68" font-size="13" font-weight="700" style="fill:#6b5300">border</text>
<rect x="90" y="78" width="340" height="130" rx="4" fill="#bcd9a7" stroke="#7aa35e"/><text x="106" y="98" font-size="13" font-weight="700" style="fill:#2e5a14">padding</text>
<rect x="150" y="112" width="220" height="62" rx="3" fill="#8fb8e6" stroke="#4f86bf"/><text x="260" y="148" text-anchor="middle" font-size="14" font-weight="800" style="fill:#0f3a6b">content (width × height)</text></svg></figure>
<table><tr><th><code>box-sizing</code></th><th>Co oznacza <code>width</code></th><th>Przykład: width:200px; padding:20px; border:5px</th></tr>
<tr><td><code>content-box</code> (domyślne)</td><td>tylko szerokość treści</td><td>200 + 2×20 + 2×5 = <b>250 px</b> całkowitej szerokości</td></tr>
<tr><td><code>border-box</code></td><td>treść + padding + border</td><td>całość to <b>200 px</b> (treść kurczy się do 150)</td></tr></table>
<div class="callout tip">Margin <b>nigdy</b> nie wlicza się do width. Pionowe marginesy sąsiadujących bloków <i>zapadają się</i> (margin collapsing): odstęp = większy z nich, a nie suma.</div>
<h4>Specyficzność selektorów (kto wygrywa)</h4>
<p>inline <code>style=""</code> &gt; <code>#id</code> &gt; <code>.klasa</code>, <code>[atrybut]</code>, <code>:pseudo-klasa</code> &gt; <code>element</code>. <code>!important</code> przebija wszystko poza innym <code>!important</code> o wyższej specyficzności. Przy równej specyficzności wygrywa <b>późniejsza</b> reguła.</p>
<h4>Flexbox i Grid</h4>
<ul><li><code>display:flex</code>: układ jednowymiarowy. <code>justify-content</code> działa na <b>osi głównej</b>, <code>align-items</code> na <b>poprzecznej</b>. Domyślnie <code>flex-direction: row</code>.</li><li><code>display:grid</code>: układ dwuwymiarowy (wiersze i kolumny), np. <code>grid-template-columns: repeat(3, 1fr)</code>.</li></ul>`},
{h:'JavaScript: typy, równość, zasięg',html:`
<table><tr><th>Wyrażenie</th><th>Wynik</th><th>Dlaczego</th></tr>
<tr><td><code>typeof null</code></td><td>"object"</td><td>historyczny błąd języka</td></tr>
<tr><td><code>typeof NaN</code></td><td>"number"</td><td>NaN to specjalna liczba</td></tr>
<tr><td><code>typeof []</code></td><td>"object"</td><td>tablica to obiekt (<code>Array.isArray</code> je rozpozna)</td></tr>
<tr><td><code>0 == '0'</code></td><td>true</td><td><code>==</code> robi konwersję typów</td></tr>
<tr><td><code>0 === '0'</code></td><td>false</td><td><code>===</code> porównuje też typ</td></tr>
<tr><td><code>null == undefined</code></td><td>true</td><td>specjalna reguła; <code>===</code> da false</td></tr>
<tr><td><code>NaN == NaN</code></td><td>false</td><td>NaN nie jest równe nawet sobie (użyj <code>Number.isNaN</code>)</td></tr>
<tr><td><code>[] + []</code></td><td>""</td><td>tablice → puste stringi → konkatenacja</td></tr>
<tr><td><code>'5' + 3</code> / <code>'5' - 3</code></td><td>"53" / 2</td><td><code>+</code> łączy teksty, <code>-</code> zawsze liczy</td></tr></table>
<h4>var / let / const</h4>
<table><tr><th></th><th>zasięg</th><th>hoisting</th><th>ponowne przypisanie</th></tr>
<tr><td><code>var</code></td><td>funkcja</td><td>tak, wartość <code>undefined</code></td><td>tak</td></tr>
<tr><td><code>let</code></td><td>blok <code>{}</code></td><td>tak, ale TDZ (błąd przed deklaracją)</td><td>tak</td></tr>
<tr><td><code>const</code></td><td>blok</td><td>j.w.</td><td><b>nie</b> (ale obiekt w środku można modyfikować)</td></tr></table>
<pre>const user = { name: 'Ala' };
user.name = 'Ola';    // OK – zmieniamy zawartość obiektu
user = {};            // TypeError – nie wolno przypisać nowej referencji</pre>
<div class="callout trap">Klasyk: pętla <code>for (var i=0;i&lt;3;i++) setTimeout(()=&gt;console.log(i))</code> wypisze <b>3 3 3</b> (jedno wspólne <code>i</code>), a z <code>let</code> – <b>0 1 2</b> (osobne <code>i</code> na każdą iterację).</div>`},
{h:'Event loop: kolejność wykonania',html:`
<figure class="diagram"><svg viewBox="0 0 660 230" width="660" role="img" aria-label="Event loop">
<g font-size="13" text-anchor="middle" font-weight="700">
<rect class="bx" x="10" y="20" width="170" height="110" rx="10"/><text x="95" y="42">Call Stack</text><text x="95" y="62" class="t2" font-weight="500" font-size="11">kod synchroniczny</text>
<rect x="30" y="72" width="130" height="24" rx="5" fill="#be185d" opacity=".85"/><text x="95" y="89" style="fill:#fff" font-size="12">console.log(1)</text>
<rect class="bx" x="250" y="10" width="190" height="60" rx="10" style="stroke:#be185d"/><text x="345" y="34">Mikrozadania</text><text x="345" y="54" class="t2" font-weight="500" font-size="11">Promise.then, queueMicrotask</text>
<rect class="bx" x="250" y="90" width="190" height="60" rx="10"/><text x="345" y="114">Makrozadania</text><text x="345" y="134" class="t2" font-weight="500" font-size="11">setTimeout, zdarzenia, I/O</text>
<rect class="bx" x="510" y="40" width="140" height="80" rx="10"/><text x="580" y="70">Event Loop</text><text x="580" y="90" class="t2" font-weight="500" font-size="11">pobiera, gdy stos pusty</text>
<path class="ln" d="M180 70H248M440 40H508M440 120H508" marker-end="url(#c)"/></g>
<text x="330" y="182" text-anchor="middle" font-size="13" font-weight="700">Kolejność: stos → WSZYSTKIE mikrozadania → jedno makrozadanie → mikrozadania → ...</text>
<text x="330" y="204" text-anchor="middle" font-size="12" class="t2">JS ma jeden główny wątek wykonania – długie obliczenie blokuje UI.</text>
<defs><marker id="c" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L7 3L0 6z" fill="#6b665c"/></marker></defs></svg></figure>
<pre>console.log(1);
setTimeout(() =&gt; console.log(2), 0);
Promise.resolve().then(() =&gt; console.log(3));
console.log(4);
// Wynik: 1 4 3 2</pre>
<p>Dlaczego? <code>1</code> i <code>4</code> są synchroniczne. Gdy stos opróżni się, najpierw idą <b>mikrozadania</b> (<code>3</code>), potem <b>makrozadania</b> (<code>2</code>), mimo że <code>setTimeout</code> ma 0 ms.</p>
<h4>async/await</h4>
<p><code>async function</code> zawsze zwraca Promise. <code>await</code> wstrzymuje <i>tę funkcję</i>, a nie cały wątek.</p>`},
{h:'Przeglądarka, HTTP, przechowywanie, frameworki',html:`
<table><tr><th></th><th>localStorage</th><th>sessionStorage</th><th>Cookie</th></tr>
<tr><td>Czas życia</td><td>do ręcznego usunięcia</td><td>do zamknięcia karty</td><td>do daty wygaśnięcia</td></tr>
<tr><td>Wielkość</td><td>~5 MB</td><td>~5 MB</td><td>~4 KB</td></tr>
<tr><td>Wysyłane do serwera?</td><td><b>nie</b></td><td><b>nie</b></td><td><b>tak</b>, z każdym żądaniem do domeny</td></tr></table>
<table><tr><th>Kod</th><th>Znaczenie</th></tr>
<tr><td>200 / 201 / 204</td><td>OK / utworzono / brak treści</td></tr><tr><td>301 / 302</td><td>przeniesiono trwale / tymczasowo</td></tr>
<tr><td>400 / 401 / 403 / 404</td><td>zły request / niezalogowany / zabronione / nie znaleziono</td></tr>
<tr><td>500 / 502 / 503</td><td>błąd serwera / zła brama / usługa niedostępna</td></tr></table>
<p>Grupy: <b>2xx</b> sukces, <b>3xx</b> przekierowania, <b>4xx</b> błąd klienta, <b>5xx</b> błąd serwera.</p>
<h4>React w pigułce</h4>
<ul><li><b>Virtual DOM</b>: React porównuje nowe i stare drzewo i aktualizuje tylko różnice.</li><li>Zmiana <b>stanu</b> (<code>useState</code>) powoduje ponowny render komponentu. <b>Props</b> są tylko do odczytu.</li><li><code>useEffect</code> – efekty uboczne (fetch, subskrypcje); lista zależności steruje, kiedy się uruchomi.</li><li>Hooki wywołujemy <b>tylko na najwyższym poziomie</b> komponentu (nie w pętlach, warunkach).</li></ul>
<h4>Wydajność i dostępność</h4>
<ul><li><b>Core Web Vitals</b>: LCP (ładowanie głównej treści), INP (reakcja na interakcję), CLS (przesuwanie układu).</li><li>Semantyczny HTML (<code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;button&gt;</code>), atrybut <code>alt</code> w obrazkach, kontrast, obsługa klawiatury.</li><li>Responsywność: <code>&lt;meta name="viewport"&gt;</code>, media queries, podejście mobile-first.</li></ul>`}
],
qs:[
{p:1,q:'Które wyrażenia JavaScript zwracają <b>"object"</b> dla operatora <code>typeof</code>?',o:[['<code>typeof null</code>',1,'Historyczny błąd języka, utrzymywany dla zgodności wstecznej.'],['<code>typeof []</code>',1,'Tablica jest obiektem. Do sprawdzenia tablicy służy Array.isArray().'],['<code>typeof {}</code>',1,'Zwykły obiekt.'],['<code>typeof NaN</code>',0,'NaN to „Not a Number”, ale jego typ to "number".']],tip:'typeof null === "object" to najsłynniejsza dziwność JS. NaN ma typ number.'},
{p:3,q:'Które porównania w JavaScript dają <b>true</b>?',o:[['<code>0 == \'0\'</code>',1,'Luźne porównanie konwertuje string na liczbę.'],['<code>null == undefined</code>',1,'Specjalna reguła specyfikacji (ale <code>null === undefined</code> to false).'],['<code>NaN == NaN</code>',0,'NaN nie jest równe niczemu, nawet samemu sobie. Użyj Number.isNaN().'],['<code>0 === \'0\'</code>',0,'Ścisłe porównanie sprawdza też typ: number ≠ string.']],tip:'W kodzie produkcyjnym używaj ===. == robi niejawne konwersje i jest źródłem błędów.'},
{p:1,q:'Dla elementu: <code>width:200px; padding:20px; border:5px solid;</code> (domyślne <code>box-sizing</code>). Które zdania są <b>prawdziwe</b>?',o:[['Całkowita szerokość widoczna na ekranie to 250px',1,'200 + 20+20 (padding) + 5+5 (border) = 250.'],['Po dodaniu <code>box-sizing:border-box</code> całkowita szerokość to 200px',1,'W border-box width obejmuje padding i border; zmniejsza się obszar treści.'],['Margin zalicza się do <code>width</code> w <code>border-box</code>',0,'Margin zawsze leży poza elementem i nie wchodzi do width.'],['Padding znajduje się wewnątrz obramowania',1,'Kolejność od środka: content → padding → border → margin.']],tip:'Wzór (content-box): width + padding + border. Dlatego w CSS często ustawia się globalnie box-sizing: border-box.'},
{p:3,q:'Które zdania o <b>specyficzności CSS</b> są prawdziwe?',o:[['Selektor ID jest silniejszy niż selektor klasy',1,'Hierarchia: inline > #id > .klasa > element.'],['Styl inline (atrybut style) jest silniejszy niż selektor ID',1,'Stąd trudność nadpisywania inline z arkusza.'],['<code>!important</code> przebija zwykłe deklaracje',1,'Dlatego nadużywanie go prowadzi do chaosu w CSS.'],['Selektor elementu (<code>p</code>) jest silniejszy niż klasa',0,'Element jest najsłabszy z wymienionych.']],tip:'Przy remisie decyduje kolejność w pliku: późniejsza reguła wygrywa.'},
{p:1,q:'Które stwierdzenia o <code>var</code>, <code>let</code> i <code>const</code> są prawdziwe?',o:[['<code>let</code> i <code>const</code> mają zasięg blokowy',1,'Widoczne tylko wewnątrz najbliższych klamer { }.'],['<code>var</code> ma zasięg funkcyjny i jest „hoistowany” z wartością undefined',1,'Można go użyć przed deklaracją (dostaniesz undefined).'],['Właściwości obiektu zadeklarowanego jako <code>const</code> można zmieniać',1,'const blokuje przypisanie nowej referencji, nie mutację obiektu.'],['<code>const</code> czyni obiekt głęboko niezmiennym',0,'Do zamrożenia płytkiego służy Object.freeze().']],tip:'Domyślnie używaj const, let tylko gdy trzeba przypisać ponownie, var – prawie nigdy.'},
{p:3,q:'Kod: <code>console.log(1); setTimeout(()=>console.log(2),0); Promise.resolve().then(()=>console.log(3)); console.log(4);</code> Które stwierdzenia są <b>prawdziwe</b>?',o:[['Wypisze 1, 4, 3, 2',1,'Synchronicznie: 1, 4. Potem mikrozadanie (3). Na końcu makrozadanie setTimeout (2).'],['Mikrozadania (Promise) wykonują się przed makrozadaniami (setTimeout)',1,'Event loop opróżnia kolejkę mikrozadań przed pobraniem następnego makrozadania.'],['<code>setTimeout(fn, 0)</code> wykona fn natychmiast, synchronicznie',0,'Funkcja trafia do kolejki i uruchomi się dopiero po opróżnieniu stosu i mikrozadań.'],['JavaScript wykonuje kod na jednym głównym wątku',1,'Współbieżność zapewnia event loop, a nie wiele wątków wykonujących JS naraz.']],tip:'Kolejność: kod synchroniczny → mikrozadania → makrozadania.'},
{p:1,q:'Które stwierdzenia o <b>przechowywaniu danych w przeglądarce</b> są prawdziwe?',o:[['localStorage zachowuje dane po zamknięciu przeglądarki',1,'Dopóki użytkownik lub kod ich nie usunie.'],['sessionStorage jest ograniczone do jednej karty/sesji',1,'Po zamknięciu karty dane znikają.'],['Ciasteczka są automatycznie wysyłane z żądaniami HTTP do serwera',1,'Dlatego nie nadają się do dużych danych.'],['localStorage jest automatycznie wysyłane do serwera z każdym żądaniem',0,'Dane z localStorage zostają w przeglądarce, dopóki sam ich nie wyślesz.']],tip:'Cookie = idzie do serwera. Storage = zostaje w przeglądarce.'},
{p:3,q:'Które kody odpowiedzi HTTP są <b>opisane poprawnie</b>?',o:[['404 – nie znaleziono zasobu',1,'Błąd klienta: zasób pod tym adresem nie istnieje.'],['301 – trwałe przekierowanie',1,'Przeglądarki i wyszukiwarki zapamiętują nowy adres.'],['401 – brak uwierzytelnienia',1,'Nie jesteś zalogowany lub dane są nieprawidłowe. (403 = zalogowany, ale bez uprawnień).'],['500 – błąd po stronie klienta',0,'Kody 5xx to błędy serwera. Błędy klienta to 4xx.']],tip:'4xx = to ty coś zrobiłeś źle. 5xx = serwer się potknął.'},
{p:1,q:'Które stwierdzenia o <b>React</b> są prawdziwe?',o:[['React używa Virtual DOM do wydajnych aktualizacji',1,'Porównuje (diffuje) drzewa i wprowadza do DOM tylko zmiany.'],['Zmiana stanu komponentu wywołuje jego ponowny render',1,'Stąd reaktywność interfejsu.'],['<code>useEffect</code> służy do efektów ubocznych, np. pobierania danych',1,'Uruchamia się po renderze, zależnie od tablicy zależności.'],['Hooki można bezpiecznie wywoływać wewnątrz pętli i instrukcji warunkowych',0,'Łamie to kolejność hooków; mogą być wywoływane tylko na najwyższym poziomie komponentu.']],tip:'Zasady hooków: tylko na górze komponentu lub innego hooka, nigdy warunkowo.'},
{p:3,q:'Które stwierdzenia o <b>Flexboxie</b> są prawdziwe?',o:[['<code>justify-content</code> wyrównuje elementy wzdłuż osi głównej',1,'Przy row to oś pozioma.'],['<code>align-items</code> działa na osi poprzecznej',1,'Przy row – w pionie.'],['Domyślny <code>flex-direction</code> to <code>row</code>',1,'Elementy układają się poziomo.'],['<code>display:flex</code> zawsze układa elementy w kolumnie',0,'Domyślnie w wierszu; kolumnę włączysz przez flex-direction: column.']],tip:'Oś główna zależy od flex-direction: przy column role osi się zamieniają.'}
]};
