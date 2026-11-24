BANK.python={name:'Język Python',icon:'🐍',color:'#a16207',
intro:'Pytania „co wypisze ten kod” i pułapki: mutowalność, argumenty domyślne, kopiowanie, zakresy, wyjątki, GIL. Python wydaje się prosty, więc to właśnie na szczegółach traci się punkty.',
lessons:[
{h:'Typy, mutowalność i identyczność',html:`
<table><tr><th>Typ</th><th>Mutowalny?</th><th>Uwagi</th></tr>
<tr><td><code>int, float, str, tuple, frozenset, bool</code></td><td><b>nie</b></td><td>każda „zmiana” tworzy nowy obiekt</td></tr>
<tr><td><code>list, dict, set, bytearray</code></td><td><b>tak</b></td><td>modyfikacja w miejscu</td></tr></table>
<ul><li>Klucz słownika i element zbioru muszą być <b>hashowalne</b> (zwykle niemutowalne): <code>{[1,2]: 'x'}</code> → <code>TypeError</code>.</li>
<li><code>==</code> porównuje <b>wartości</b>, <code>is</code> porównuje <b>tożsamość</b> (ten sam obiekt w pamięci).</li></ul>
<pre>a = [1]
b = [1]
a == b      # True   – równe wartości
a is b      # False  – dwa różne obiekty
c = a
c is a      # True   – ta sama referencja</pre>
<h4>Kopiowanie</h4>
<figure class="diagram"><svg viewBox="0 0 640 180" width="640" role="img" aria-label="Płytka i głęboka kopia">
<g font-size="12" font-weight="700" text-anchor="middle">
<text x="105" y="16">a = [1, [2, 3]]</text><rect class="bx" x="20" y="26" width="170" height="40" rx="6"/><rect x="30" y="34" width="40" height="24" rx="4" fill="#a16207" opacity=".85"/><text x="50" y="51" style="fill:#fff">1</text><rect x="80" y="34" width="100" height="24" rx="4" fill="#4338ca" opacity=".85"/><text x="130" y="51" style="fill:#fff">→ [2,3]</text>
<text x="330" y="16">b = a.copy()  (płytka)</text><rect class="bx" x="240" y="26" width="170" height="40" rx="6"/><rect x="250" y="34" width="40" height="24" rx="4" fill="#a16207" opacity=".85"/><text x="270" y="51" style="fill:#fff">1</text><rect x="300" y="34" width="100" height="24" rx="4" fill="#4338ca" opacity=".85"/><text x="350" y="51" style="fill:#fff">→ [2,3]</text>
<text x="545" y="16">deepcopy(a)</text><rect class="bx" x="460" y="26" width="170" height="40" rx="6"/><rect x="470" y="34" width="40" height="24" rx="4" fill="#a16207" opacity=".85"/><text x="490" y="51" style="fill:#fff">1</text><rect x="520" y="34" width="100" height="24" rx="4" fill="#15803d" opacity=".85"/><text x="570" y="51" style="fill:#fff">→ [2,3]′ nowa</text>
<rect x="130" y="104" width="130" height="34" rx="6" fill="#4338ca" opacity=".85"/><text x="195" y="126" style="fill:#fff">wspólna lista [2,3]</text><path d="M130 58C130 80 160 96 175 102M350 58C350 80 240 96 215 102" fill="none" stroke="#4338ca" stroke-width="1.8" stroke-dasharray="4 3"/>
<rect x="500" y="104" width="130" height="34" rx="6" fill="#15803d" opacity=".85"/><text x="565" y="126" style="fill:#fff">osobna kopia</text><path d="M570 58V102" stroke="#15803d" stroke-width="1.8"/></g>
<text x="320" y="165" text-anchor="middle" font-size="12" class="t2">b[1].append(4) zmieni też a[1] (płytka kopia współdzieli zagnieżdżone obiekty), ale nie deepcopy.</text></svg></figure>`},
{h:'Funkcje i pułapki: argumenty domyślne, zakres, slicing',html:`
<pre>def dodaj(x, lista=[]):        # PUŁAPKA!
    lista.append(x)
    return lista

dodaj(1)   # [1]
dodaj(2)   # [1, 2]   ← ta sama lista!</pre>
<p>Wartość domyślna jest obliczana <b>raz</b>, przy definicji funkcji, nie przy każdym wywołaniu. Poprawnie:</p>
<pre>def dodaj(x, lista=None):
    if lista is None:
        lista = []
    lista.append(x)
    return lista</pre>
<h4>Slicing – <code>s[start:stop:krok]</code>, <code>stop</code> jest wyłączony</h4>
<figure class="diagram"><svg viewBox="0 0 560 120" width="560" role="img" aria-label="Indeksy w Pythonie">
<g font-size="15" font-weight="700" text-anchor="middle">
<g><rect class="bx" x="40" y="35" width="70" height="40" rx="6"/><text x="75" y="61">0</text><rect class="bx" x="120" y="35" width="70" height="40" rx="6"/><text x="155" y="61">1</text><rect class="bx" x="200" y="35" width="70" height="40" rx="6"/><text x="235" y="61">2</text><rect class="bx" x="280" y="35" width="70" height="40" rx="6"/><text x="315" y="61">3</text><rect class="bx" x="360" y="35" width="70" height="40" rx="6"/><text x="395" y="61">4</text><rect class="bx" x="440" y="35" width="70" height="40" rx="6"/><text x="475" y="61">5</text></g>
<g class="t2" font-size="12" font-weight="500"><text x="75" y="22">0</text><text x="155" y="22">1</text><text x="235" y="22">2</text><text x="315" y="22">3</text><text x="395" y="22">4</text><text x="475" y="22">5</text><text x="75" y="98">-6</text><text x="155" y="98">-5</text><text x="235" y="98">-4</text><text x="315" y="98">-3</text><text x="395" y="98">-2</text><text x="475" y="98">-1</text></g></g>
<text x="280" y="115" text-anchor="middle" font-size="12" class="t2">s = [0,1,2,3,4,5] → s[1:4] = [1,2,3] | s[-2:] = [4,5] | s[::-1] = [5,4,3,2,1,0]</text></svg></figure>
<h4>Liczby</h4>
<ul><li><code>10 // 3 == 3</code> (dzielenie całkowite z <b>zaokrągleniem w dół</b>), <code>-7 // 2 == -4</code>, <code>10 / 2 == 5.0</code> (zawsze float).</li><li><code>0.1 + 0.2 == 0.3</code> → <b>False</b> (błędy zmiennoprzecinkowe; użyj <code>math.isclose</code>).</li></ul>
<h4>Zakres zmiennych – reguła LEGB</h4>
<p>Szukanie nazwy: <b>L</b>ocal → <b>E</b>nclosing → <b>G</b>lobal → <b>B</b>uilt-in. Przypisanie w funkcji tworzy zmienną lokalną, chyba że użyjesz <code>global</code>/<code>nonlocal</code>.</p>`},
{h:'Kolekcje, comprehension, generatory',html:`
<table><tr><th>Struktura</th><th>Zapis</th><th>Cechy</th></tr>
<tr><td>list</td><td><code>[1, 2, 3]</code></td><td>uporządkowana, mutowalna, duplikaty OK</td></tr>
<tr><td>tuple</td><td><code>(1, 2, 3)</code></td><td>uporządkowana, <b>niemutowalna</b></td></tr>
<tr><td>dict</td><td><code>{'a': 1}</code></td><td>klucz → wartość, kolejność wstawiania zachowana (od 3.7)</td></tr>
<tr><td>set</td><td><code>{1, 2, 3}</code></td><td>unikalne, bez kolejności, szybkie <code>in</code> (O(1))</td></tr></table>
<pre>[x*x for x in range(4)]        # [0, 1, 4, 9]       – lista
{x % 2 for x in range(5)}      # {0, 1}             – zbiór
{x: x*x for x in range(3)}     # {0:0, 1:1, 2:4}    – słownik
(x*x for x in range(4))        # generator – leniwy, nie liczy, dopóki nie poprosisz</pre>
<ul><li><code>range(4)</code> to 0,1,2,3 – <b>bez</b> 4.</li><li><code>d.get('x')</code> zwraca <code>None</code>, gdy brak klucza; <code>d['x']</code> → <code>KeyError</code>.</li><li><b>Generator</b> (<code>yield</code>) produkuje wartości po jednej, oszczędza pamięć.</li></ul>
<h4>Wyjątki</h4>
<pre>try:
    x = int(tekst)
except ValueError:
    print("to nie liczba")
else:
    print("OK")         # tylko gdy NIE było wyjątku
finally:
    print("zawsze")     # sprzątanie</pre>
<p>Hierarchia: <code>BaseException</code> → (<code>KeyboardInterrupt</code>, <code>SystemExit</code>) i <code>Exception</code> → reszta. Gołe <code>except:</code> łapie też Ctrl+C – unikaj.</p>`},
{h:'Współbieżność: GIL, dekoratory, środowisko',html:`
<ul><li><b>GIL</b> (Global Interpreter Lock) w CPython: tylko jeden wątek wykonuje bytecode naraz. Wątki (<code>threading</code>) pomagają przy zadaniach <b>I/O-bound</b> (sieć, dysk), ale nie przyspieszają obliczeń <b>CPU-bound</b>.</li>
<li>CPU-bound → <code>multiprocessing</code> (osobne procesy, osobny GIL) lub rozszerzenia w C (NumPy). <code>asyncio</code> – kooperacyjna współbieżność dla I/O.</li>
<li>Python 3.13 wprowadził eksperymentalną wersję <b>bez GIL</b> (free-threaded).</li></ul>
<pre>def timer(f):                      # dekorator = funkcja przyjmująca funkcję
    def wrapper(*args, **kwargs):  # *args: pozycyjne, **kwargs: nazwane
        print("start")
        return f(*args, **kwargs)
    return wrapper

@timer                             # = hello = timer(hello)
def hello(): print("hej")</pre>
<ul><li><code>venv</code> – izolowane środowisko, <code>pip</code> – instalator, <code>requirements.txt</code> / <code>pyproject.toml</code> – zależności.</li><li><code>with open(...) as f:</code> – menedżer kontekstu zamyka plik nawet po wyjątku.</li><li>f-string: <code>f"Wynik: {x:.2f}"</code>. Konwencje: PEP 8 (4 spacje wcięcia).</li></ul>`}
],
qs:[
{p:1,q:'Które stwierdzenia o <b>mutowalności</b> typów w Pythonie są prawdziwe?',o:[['Lista (<code>list</code>) jest mutowalna',1,'Możesz zmieniać, dodawać i usuwać elementy w miejscu.'],['Krotka (<code>tuple</code>) jest niemutowalna',1,'Po utworzeniu nie zmienisz jej elementów.'],['<code>str</code> jest niemutowalny',1,'Metody typu upper() zwracają nowy napis.'],['Listę można użyć jako klucza słownika',0,'Klucz musi być hashowalny; lista jest mutowalna, więc nie jest (TypeError).']],tip:'Hashowalne ≈ niemutowalne: int, str, tuple (z niemutowalnych elementów), frozenset.'},
{p:3,q:'Dla <code>s = [0,1,2,3,4,5]</code> które wyrażenia dają <b>poprawny wynik</b>?',o:[['<code>s[1:4]</code> → <code>[1, 2, 3]</code>',1,'Indeks końcowy jest wyłączony.'],['<code>s[::-1]</code> → <code>[5, 4, 3, 2, 1, 0]</code>',1,'Krok -1 odwraca kolejność.'],['<code>s[-2:]</code> → <code>[4, 5]</code>',1,'Dwa ostatnie elementy.'],['<code>s[:3]</code> → <code>[0, 1, 2, 3]</code>',0,'Wynik to [0, 1, 2] – stop (3) jest wyłączony.']],tip:'s[a:b] zawiera elementy od a do b-1. Długość wyniku = b − a.'},
{p:1,q:'Kod: <code>def f(x, l=[]): l.append(x); return l</code>, a potem <code>f(1); f(2)</code>. Które stwierdzenia są <b>prawdziwe</b>?',o:[['Drugie wywołanie zwróci <code>[1, 2]</code>',1,'Domyślna lista jest ta sama przy każdym wywołaniu.'],['Wartość domyślna jest obliczana raz, w momencie definicji funkcji',1,'Dlatego mutowalne wartości domyślne są pułapką.'],['Każde wywołanie bez drugiego argumentu tworzy nową, pustą listę',0,'To właśnie NIE jest prawda – lista jest współdzielona.'],['Rozwiązanie: <code>l=None</code> i utworzenie listy wewnątrz funkcji',1,'Standardowy idiom pozwalający uniknąć błędu.']],tip:'Nigdy nie używaj [] ani {} jako wartości domyślnej argumentu.'},
{p:3,q:'Które stwierdzenia o <b>== i is</b> są prawdziwe?',o:[['<code>==</code> porównuje wartości',1,'Wywołuje __eq__.'],['<code>is</code> sprawdza, czy to ten sam obiekt w pamięci',1,'Porównuje tożsamość (id).'],['<code>[1] == [1]</code> daje <code>True</code>',1,'Listy mają równe elementy.'],['<code>[1] is [1]</code> daje <code>True</code>',0,'To dwa osobne obiekty – wynik False.']],tip:'is używaj głównie z None: if x is None. Do wartości służy ==.'},
{p:1,q:'Które stwierdzenia o <b>słownikach</b> (<code>dict</code>) są prawdziwe?',o:[['<code>d.get("x")</code> zwraca <code>None</code>, gdy klucza brak',1,'Nie rzuca wyjątku (można podać wartość domyślną drugim argumentem).'],['<code>d["x"]</code> rzuca <code>KeyError</code>, gdy klucza brak',1,'Dlatego używa się get() lub in.'],['Od Pythona 3.7 słownik zachowuje kolejność wstawiania',1,'Stało się to gwarancją języka.'],['Zbiór (<code>set</code>) może zawierać listy jako elementy',0,'Elementy zbioru muszą być hashowalne, więc lista nie może.']],tip:'dict: lookup po kluczu O(1) średnio.'},
{p:3,q:'Które wyrażenia dają <b>podany wynik</b>?',o:[['<code>[x*x for x in range(4)]</code> → <code>[0, 1, 4, 9]</code>',1,'range(4) = 0,1,2,3.'],['<code>{x % 2 for x in range(5)}</code> → <code>{0, 1}</code>',1,'To zbiór – duplikaty znikają.'],['<code>(x*x for x in range(4))</code> to generator (obliczany leniwie)',1,'Nawiasy okrągłe = generator, nie krotka.'],['<code>range(4)</code> zawiera liczbę 4',0,'range(4) kończy się na 3.']],tip:'[] lista, {} zbiór/słownik, () generator – to także prosty sposób na zapamiętanie typu.'},
{p:1,q:'Kod: <code>a = [1, [2, 3]]; b = a.copy(); b[1].append(4)</code>. Które stwierdzenia są <b>prawdziwe</b>?',o:[['<code>a</code> też zawiera teraz 4 w zagnieżdżonej liście',1,'copy() to kopia płytka – wewnętrzna lista jest współdzielona.'],['<code>copy.deepcopy(a)</code> utworzyłby niezależną kopię również wewnętrznych list',1,'Deepcopy rekurencyjnie kopiuje zagnieżdżone obiekty.'],['<code>b = a</code> (bez copy) sprawia, że obie nazwy wskazują ten sam obiekt',1,'To tylko drugie imię tego samego obiektu.'],['<code>list.copy()</code> robi kopię głęboką',0,'Robi płytką – dotyczy tylko pierwszego poziomu.']],tip:'Płytka kopia kopiuje „pudełka”, ale nie zawartość pudełek-obiektów w środku.'},
{p:3,q:'Które stwierdzenia o <b>obsłudze wyjątków</b> w Pythonie są prawdziwe?',o:[['Blok <code>else</code> wykonuje się, gdy w <code>try</code> nie było wyjątku',1,'Przydatne, by oddzielić kod „sukcesu” od kodu chronionego.'],['Blok <code>finally</code> wykonuje się zawsze',1,'Także gdy wystąpi wyjątek lub return.'],['Goły <code>except:</code> przechwytuje też <code>KeyboardInterrupt</code> i <code>SystemExit</code>',1,'Dlatego jest uważany za złą praktykę.'],['<code>except Exception</code> przechwytuje <code>KeyboardInterrupt</code>',0,'KeyboardInterrupt dziedziczy po BaseException, a nie Exception.']],tip:'Łap konkretne wyjątki (ValueError, KeyError), a nie wszystko.'},
{p:1,q:'Które stwierdzenia o <b>GIL i współbieżności</b> w CPython są prawdziwe?',o:[['GIL pozwala wykonywać bytecode tylko jednemu wątkowi naraz',1,'Ogranicza równoległość wątków w kodzie czysto pythonowym.'],['Wątki dobrze sprawdzają się w zadaniach I/O-bound',1,'Podczas oczekiwania na I/O GIL jest zwalniany.'],['<code>multiprocessing</code> pozwala obejść GIL dla zadań CPU-bound',1,'Każdy proces ma własny interpreter i własny GIL.'],['Wątki zawsze przyspieszają obliczenia CPU-bound w czystym Pythonie',0,'Przez GIL zwykle nie – a narzut przełączania może nawet spowolnić.']],tip:'I/O-bound → wątki lub asyncio. CPU-bound → procesy.'},
{p:3,q:'Które wyrażenia dają <b>poprawny wynik</b>?',o:[['<code>0.1 + 0.2 == 0.3</code> → <code>False</code>',1,'Reprezentacja binarna float nie jest dokładna (0.30000000000000004).'],['<code>10 // 3</code> → <code>3</code>',1,'Dzielenie całkowite.'],['<code>-7 // 2</code> → <code>-4</code>',1,'<code>//</code> zaokrągla w dół (floor), a nie w stronę zera.'],['<code>10 / 2</code> → <code>5</code> (typ int)',0,'W Pythonie 3 operator / zwraca float: 5.0.']],tip:'/ → float, // → floor. Dla porównań zmiennoprzecinkowych: math.isclose().'}
]};
