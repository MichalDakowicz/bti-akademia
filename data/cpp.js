BANK.cpp={name:'Język C++',icon:'⚙️',color:'#4338ca',
intro:'Pamięć, wskaźniki, kompilacja, STL i nowoczesny C++ (C++11–20). Typowe pytania: co wypisze kod, co jest niezdefiniowanym zachowaniem, jak działa RAII.',
lessons:[
{h:'Od kodu do programu: kompilacja',html:`
<figure class="diagram"><svg viewBox="0 0 700 150" width="700" role="img" aria-label="Kompilacja C++">
<g font-size="13" text-anchor="middle" font-weight="700">
<rect class="bx" x="5" y="30" width="95" height="50" rx="9"/><text x="52" y="52">main.cpp</text><text x="52" y="68" font-size="10" class="t2" font-weight="500">kod źródłowy</text>
<rect class="bx" x="135" y="30" width="110" height="50" rx="9" style="stroke:#4338ca"/><text x="190" y="52">Preprocesor</text><text x="190" y="68" font-size="10" class="t2" font-weight="500">#include, #define</text>
<rect class="bx" x="280" y="30" width="100" height="50" rx="9"/><text x="330" y="52">Kompilator</text><text x="330" y="68" font-size="10" class="t2" font-weight="500">→ kod maszynowy</text>
<rect class="bx" x="415" y="30" width="90" height="50" rx="9"/><text x="460" y="52">main.o</text><text x="460" y="68" font-size="10" class="t2" font-weight="500">plik obiektowy</text>
<rect class="bx" x="540" y="30" width="80" height="50" rx="9" style="stroke:#4338ca"/><text x="580" y="52">Linker</text><text x="580" y="68" font-size="10" class="t2" font-weight="500">łączy .o + biblioteki</text>
<rect class="bx" x="640" y="30" width="55" height="50" rx="9"/><text x="667" y="60">.exe</text></g>
<path class="ln" d="M100 55H133M245 55H278M380 55H413M505 55H538M620 55H638"/>
<text x="350" y="115" text-anchor="middle" font-size="12" class="t2">Linie zaczynające się od # to dyrektywy PREPROCESORA – przetwarzane zanim kompilator zobaczy kod.</text></svg></figure>
<ul><li><code>#include</code>, <code>#define</code>, <code>#ifdef</code>, <code>#pragma once</code> – dyrektywy preprocesora (nie są częścią języka C++ w sensie składni).</li><li>Komentarze to <code>//</code> i <code>/* */</code>, nie <code>#</code>.</li><li>Błąd „undefined reference” = problem <b>linkera</b> (brak definicji), a nie kompilatora.</li></ul>`},
{h:'Pamięć: stos, sterta, wskaźniki, referencje',html:`
<figure class="diagram"><svg viewBox="0 0 660 230" width="660" role="img" aria-label="Stos i sterta">
<g font-size="13" font-weight="700" text-anchor="middle">
<rect class="bx" x="20" y="10" width="270" height="200" rx="10"/><text x="155" y="32">STOS (stack)</text>
<rect x="40" y="46" width="230" height="34" rx="6" fill="#4338ca" opacity=".85"/><text x="155" y="68" style="fill:#fff">int a = 5;   (adres 0x7ffc…)</text>
<rect x="40" y="88" width="230" height="34" rx="6" fill="#4338ca" opacity=".85"/><text x="155" y="110" style="fill:#fff">int* p = new int(7);  (sam wskaźnik)</text>
<text x="155" y="150" class="t2" font-weight="500" font-size="12">automatyczny, bardzo szybki</text><text x="155" y="168" class="t2" font-weight="500" font-size="12">zwalniany przy wyjściu z zakresu</text><text x="155" y="186" class="t2" font-weight="500" font-size="12">mały (kilka MB)</text>
<rect class="bx" x="370" y="10" width="270" height="200" rx="10"/><text x="505" y="32">STERTA (heap)</text>
<rect x="450" y="60" width="110" height="34" rx="6" fill="#be185d" opacity=".85"/><text x="505" y="82" style="fill:#fff">7  (new int)</text>
<text x="505" y="150" class="t2" font-weight="500" font-size="12">ręczne zarządzanie (new/delete)</text><text x="505" y="168" class="t2" font-weight="500" font-size="12">lub smart pointery / RAII</text><text x="505" y="186" class="t2" font-weight="500" font-size="12">duża, wolniejsza</text></g>
<path d="M270 105C330 105 360 80 448 77" fill="none" stroke="#be185d" stroke-width="2" marker-end="url(#d)"/>
<defs><marker id="d" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L7 3L0 6z" fill="#be185d"/></marker></defs></svg></figure>
<table><tr><th></th><th>Wskaźnik <code>int* p</code></th><th>Referencja <code>int&amp; r</code></th></tr>
<tr><td>Może być pusty</td><td>tak (<code>nullptr</code>)</td><td>nie</td></tr>
<tr><td>Można zmienić cel (reseat)</td><td>tak</td><td>nie – zawsze ten sam obiekt</td></tr>
<tr><td>Musi być zainicjowany przy deklaracji</td><td>nie (ale powinien)</td><td>tak</td></tr>
<tr><td>Dostęp do wartości</td><td><code>*p</code></td><td>zwykła nazwa</td></tr></table>
<h4>const i wskaźniki – czytaj od prawej do lewej</h4>
<ul><li><code>const int* p</code> – wskaźnik na <b>stałą</b> liczbę: nie zmienisz <code>*p</code>, ale możesz przestawić <code>p</code>.</li><li><code>int* const p</code> – <b>stały</b> wskaźnik: nie przestawisz <code>p</code>, ale możesz zmienić <code>*p</code>.</li></ul>
<h4>new / delete</h4>
<ul><li><code>new</code> ↔ <code>delete</code>, <code>new[]</code> ↔ <code>delete[]</code>, <code>malloc</code> ↔ <code>free</code>. Pomieszanie = niezdefiniowane zachowanie (UB).</li><li>Podwójne <code>delete</code>, użycie po zwolnieniu (<i>use-after-free</i>), wyjście poza tablicę = UB.</li></ul>`},
{h:'RAII i smart pointery',html:`
<p><b>RAII</b> (Resource Acquisition Is Initialization): zasób (pamięć, plik, mutex) jest przejmowany w konstruktorze i <b>zwalniany w destruktorze</b>. Gdy obiekt wychodzi z zakresu – nawet przez wyjątek – zasób zostaje zwolniony automatycznie.</p>
<table><tr><th>Typ</th><th>Własność</th><th>Kopiowanie</th></tr>
<tr><td><code>unique_ptr&lt;T&gt;</code></td><td>wyłączna (jeden właściciel)</td><td><b>zabronione</b>, można <code>std::move</code></td></tr>
<tr><td><code>shared_ptr&lt;T&gt;</code></td><td>współdzielona, licznik referencji</td><td>tak (licznik rośnie)</td></tr>
<tr><td><code>weak_ptr&lt;T&gt;</code></td><td>obserwator, nie zwiększa licznika</td><td>tak</td></tr></table>
<pre>auto a = std::make_unique&lt;Foo&gt;();   // jedyny właściciel
auto b = std::make_shared&lt;Foo&gt;();   // licznik = 1
auto c = b;                          // licznik = 2
// a koniec zakresu → Foo zniszczone automatycznie. Brak delete.</pre>
<div class="callout trap"><code>shared_ptr</code> w cyklu (A wskazuje B, B wskazuje A) nigdy nie spadnie do zera → <b>wyciek</b>. Rozwiązanie: jeden kierunek jako <code>weak_ptr</code>. <code>auto_ptr</code> został <b>usunięty w C++17</b>.</div>`},
{h:'OOP, STL i złożoność',html:`
<ul><li><b>Polimorfizm</b>: wywołanie przez wskaźnik/referencję do bazy wybiera wersję z klasy pochodnej, ale tylko dla metod <code>virtual</code> (przez vtable).</li>
<li><b>Destruktor klasy bazowej powinien być <code>virtual</code></b>, jeśli usuwasz obiekt przez wskaźnik do bazy, inaczej UB / wyciek.</li>
<li><code>= 0</code> przy metodzie wirtualnej (czysto wirtualna) → klasa abstrakcyjna, nie da się stworzyć jej instancji.</li>
<li><code>override</code> jest opcjonalne, ale <b>zalecane</b>: kompilator zgłosi błąd, gdy nic nie nadpisujesz.</li></ul>
<table><tr><th>Kontener</th><th>Dostęp</th><th>Wstaw/usuń</th><th>Uwagi</th></tr>
<tr><td><code>vector</code></td><td>O(1) losowy</td><td>koniec: O(1) <i>zamortyzowane</i>; początek/środek: O(n)</td><td>ciągła pamięć, najczęściej najlepszy wybór</td></tr>
<tr><td><code>list</code></td><td>O(n)</td><td>O(1) przy znanej pozycji</td><td>lista dwukierunkowa</td></tr>
<tr><td><code>map</code> / <code>set</code></td><td>O(log n)</td><td>O(log n)</td><td>drzewo czerwono-czarne, posortowane klucze</td></tr>
<tr><td><code>unordered_map</code> / <code>set</code></td><td>O(1) średnio</td><td>O(1) średnio</td><td>tablica haszująca, bez porządku</td></tr></table>
<pre>int a = 7, b = 2;
std::cout &lt;&lt; a / b      // 3     – dzielenie całkowite
          &lt;&lt; " " &lt;&lt; a % b   // 1     – reszta
          &lt;&lt; " " &lt;&lt; (double)a / b;  // 3.5 – rzutowanie PRZED dzieleniem</pre>
<p><code>v[i]</code> <b>nie</b> sprawdza zakresu (UB), a <code>v.at(i)</code> rzuca <code>std::out_of_range</code>.</p>`}
],
qs:[
{p:1,q:'Które z poniższych są <b>dyrektywami preprocesora</b> w C++?',o:[['#include',1,'Wstawia zawartość pliku nagłówkowego przed kompilacją.'],['#define',1,'Definiuje makro (zastępowanie tekstu).'],['#ifdef',1,'Kompilacja warunkowa.'],['using namespace std;',0,'To instrukcja języka C++ (nie zaczyna się od #), obsługiwana przez kompilator.']],tip:'Wszystko, co zaczyna się od #, obsługuje preprocesor zanim kompilator zobaczy kod.'},
{p:3,q:'Kod: <code>int a = 5; int* p = &amp;a; *p = 10;</code>. Które stwierdzenia są <b>prawdziwe</b>?',o:[['Po wykonaniu <code>a</code> ma wartość 10',1,'Wskaźnik p zawiera adres a; *p = 10 zapisuje pod ten adres.'],['<code>p</code> przechowuje adres zmiennej <code>a</code>',1,'Operator &amp; pobiera adres.'],['<code>*p</code> oznacza adres wskaźnika <code>p</code>',0,'* (dereferencja) oznacza wartość, na którą wskazuje p; adres samego p to &amp;p.'],['W nowoczesnym C++ zaleca się <code>nullptr</code> zamiast <code>NULL</code>',1,'nullptr ma własny typ i unika niejednoznaczności przeciążeń.']],tip:'&amp;x = adres x, *p = wartość pod adresem p.'},
{p:1,q:'Które stwierdzenia o <b>smart pointerach</b> są prawdziwe?',o:[['<code>unique_ptr</code> nie może być kopiowany (można go przenieść)',1,'Wyłączna własność – kopia oznaczałaby dwóch właścicieli.'],['<code>shared_ptr</code> używa licznika referencji',1,'Obiekt jest niszczony, gdy licznik spadnie do zera.'],['<code>weak_ptr</code> pozwala przerwać cykle referencji',1,'Nie zwiększa licznika, więc nie podtrzymuje życia obiektu.'],['<code>auto_ptr</code> jest zalecany w C++17',0,'Został wycofany (C++11) i usunięty w C++17; zastąpił go unique_ptr.']],tip:'Domyślny wybór: unique_ptr. shared_ptr tylko, gdy własność naprawdę jest współdzielona.'},
{p:3,q:'Które stwierdzenia o <code>std::vector</code> są prawdziwe?',o:[['Elementy leżą w ciągłym bloku pamięci',1,'Dlatego dobrze współpracuje z cache procesora.'],['<code>v[10]</code> przy mniejszym rozmiarze jest niezdefiniowanym zachowaniem',1,'operator[] nie sprawdza zakresu.'],['<code>v.at(10)</code> rzuca wyjątek <code>std::out_of_range</code>',1,'at() sprawdza zakres i jest bezpieczniejsze.'],['<code>push_back</code> ma zawsze koszt O(1) w najgorszym przypadku',0,'Jest O(1) <i>zamortyzowane</i>; przy realokacji kopiuje/przenosi O(n) elementów.']],tip:'[] = szybko i bez kontroli. at() = kontrola i wyjątek.'},
{p:1,q:'Które stwierdzenia o <b>złożoności</b> kontenerów STL są prawdziwe?',o:[['Wyszukiwanie w <code>std::map</code> to O(log n)',1,'To zbalansowane drzewo (zwykle czerwono-czarne).'],['Wyszukiwanie w <code>std::unordered_map</code> to średnio O(1)',1,'Tablica haszująca; w najgorszym razie O(n) przy kolizjach.'],['Wstawienie na początek <code>std::vector</code> to O(n)',1,'Wszystkie elementy muszą się przesunąć.'],['Dostęp losowy do elementu <code>std::list</code> jest O(1)',0,'Lista dwukierunkowa – trzeba przejść po węzłach, O(n).']],tip:'map = posortowane i O(log n), unordered_map = nieposortowane i O(1) średnio.'},
{p:3,q:'Które stwierdzenia o <b>zarządzaniu pamięcią</b> w C++ są prawdziwe?',o:[['Pamięć zaalokowaną przez <code>new[]</code> należy zwolnić przez <code>delete[]</code>',1,'delete (bez []) na tablicy to niezdefiniowane zachowanie.'],['Dwukrotne <code>delete</code> tego samego wskaźnika to niezdefiniowane zachowanie',1,'Typowy błąd double free – może zakończyć się awarią lub luką bezpieczeństwa.'],['Pamięć z <code>malloc</code> można bezpiecznie zwolnić przez <code>delete</code>',0,'malloc łączy się z free; mieszanie z delete to UB.'],['RAII zmniejsza ryzyko wycieków pamięci',1,'Zasób zwalnia destruktor, także gdy poleci wyjątek.']],tip:'Pary: new/delete, new[]/delete[], malloc/free. Najlepiej w ogóle nie pisać ręcznie – użyj smart pointerów i kontenerów.'},
{p:1,q:'Które stwierdzenia o <b>funkcjach wirtualnych</b> są prawdziwe?',o:[['Destruktor klasy bazowej powinien być wirtualny, gdy obiekt usuwamy przez wskaźnik do bazy',1,'Inaczej wywoła się tylko destruktor bazy – UB i wyciek zasobów pochodnej.'],['Dynamiczny polimorfizm opiera się zwykle na tablicy vtable',1,'Wskaźnik do vtable w obiekcie wskazuje właściwe implementacje.'],['Funkcja czysto wirtualna (<code>= 0</code>) czyni klasę abstrakcyjną',1,'Nie można stworzyć jej instancji, tylko dziedziczyć.'],['Słowo <code>override</code> jest konieczne, by metoda pochodnej była wirtualna',0,'Wirtualność dziedziczy się z bazy; override jest opcjonalny, ale pomaga wykrywać błędy.']],tip:'Jeśli klasa ma jakąkolwiek metodę virtual, zrób też destruktor virtual.'},
{p:3,q:'Kod: <code>int a = 7, b = 2; cout &lt;&lt; a/b &lt;&lt; " " &lt;&lt; a%b &lt;&lt; " " &lt;&lt; (double)a/b;</code>. Które stwierdzenia są <b>prawdziwe</b>?',o:[['<code>a/b</code> daje 3',1,'Dzielenie dwóch int to dzielenie całkowite (ucięcie).'],['<code>a%b</code> daje 1',1,'Reszta z dzielenia 7 przez 2.'],['<code>(double)a/b</code> daje 3.5',1,'Rzutowanie a na double sprawia, że całe dzielenie jest zmiennoprzecinkowe.'],['<code>a/b</code> daje 3.5',0,'Oba operandy są int, więc wynik jest int (3).']],tip:'Dwa inty → dzielenie całkowite. Żeby dostać ułamek, rzutuj JEDEN z operandów na double przed dzieleniem.'},
{p:1,q:'Które stwierdzenia o <b>referencjach</b> są prawdziwe?',o:[['Referencja musi być zainicjowana w momencie deklaracji',1,'Nie istnieje „pusta” referencja.'],['Referencji nie można „przestawić” na inny obiekt',1,'Po związaniu zawsze oznacza ten sam obiekt.'],['Referencja nie może być <code>nullptr</code>',1,'W poprawnym programie zawsze odnosi się do istniejącego obiektu.'],['Wskaźnik musi być zainicjowany w miejscu deklaracji, inaczej kod się nie skompiluje',0,'Wskaźnik można zadeklarować bez inicjalizacji (to zła praktyka, ale legalne).']],tip:'Referencja = alias. Wskaźnik = osobny obiekt przechowujący adres.'},
{p:3,q:'Które stwierdzenia o <code>const</code> są prawdziwe?',o:[['<code>const int* p</code> – nie można zmienić <code>*p</code>',1,'Wskazywana wartość jest stała.'],['<code>int* const p</code> – nie można zmienić <code>p</code> (przestawić na inny adres)',1,'Stały jest sam wskaźnik; wartość wskazywaną wolno modyfikować.'],['Metoda oznaczona <code>const</code> nie modyfikuje stanu obiektu',1,'Można ją wywołać na obiekcie const.'],['<code>const int* p</code> – nie można zmienić samego <code>p</code>',0,'Wskaźnik można przestawić; const dotyczy wartości, na którą wskazuje.']],tip:'Czytaj deklarację od nazwy w lewo: „p is pointer to const int” vs „p is const pointer to int”.'}
]};
