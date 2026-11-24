BANK.csharp={name:'C# i .NET',icon:'🟣',color:'#7e22ce',
intro:'Typy wartościowe i referencyjne, async/await, LINQ, zarządzanie zasobami, runtime .NET. Pytania często sprawdzają „drobny druczek” języka.',
lessons:[
{h:'Jak działa .NET: od kodu do uruchomienia',html:`
<figure class="diagram"><svg viewBox="0 0 700 130" width="700" role="img" aria-label="Kompilacja .NET">
<g font-size="13" text-anchor="middle" font-weight="700">
<rect class="bx" x="5" y="25" width="110" height="50" rx="9"/><text x="60" y="48">Kod C#</text><text x="60" y="64" font-size="10" class="t2" font-weight="500">F#, VB też</text>
<rect class="bx" x="150" y="25" width="120" height="50" rx="9"/><text x="210" y="48">Kompilator</text><text x="210" y="64" font-size="10" class="t2" font-weight="500">Roslyn</text>
<rect class="bx" x="305" y="25" width="110" height="50" rx="9" style="stroke:#7e22ce"/><text x="360" y="48">IL + metadane</text><text x="360" y="64" font-size="10" class="t2" font-weight="500">.dll / .exe</text>
<rect class="bx" x="450" y="25" width="110" height="50" rx="9" style="stroke:#7e22ce"/><text x="505" y="48">CLR + JIT</text><text x="505" y="64" font-size="10" class="t2" font-weight="500">kod maszynowy w locie</text>
<rect class="bx" x="595" y="25" width="100" height="50" rx="9"/><text x="645" y="48">Działa</text><text x="645" y="64" font-size="10" class="t2" font-weight="500">+ GC</text></g>
<path class="ln" d="M115 50H148M270 50H303M415 50H448M560 50H593"/>
<text x="350" y="108" text-anchor="middle" font-size="12" class="t2">IL = Intermediate Language. CLR = środowisko uruchomieniowe. GC = automatyczne zwalnianie pamięci zarządzanej.</text></svg></figure>
<ul><li><b>.NET Framework</b> – stary, tylko Windows. <b>.NET (Core), od wersji 5</b> – nowoczesny, <b>wieloplatformowy</b> (Windows, Linux, macOS).</li><li><code>var</code> to typ <b>statyczny</b> wnioskowany przez kompilator, nie typ dynamiczny (to <code>dynamic</code>).</li></ul>`},
{h:'Typy wartościowe i referencyjne',html:`
<figure class="diagram"><svg viewBox="0 0 640 190" width="640" role="img" aria-label="Value vs reference">
<g font-size="13" font-weight="700" text-anchor="middle">
<text x="150" y="20">Typ wartościowy (struct, int)</text>
<rect class="bx" x="30" y="35" width="90" height="38" rx="6"/><text x="75" y="59">a = 5</text><rect class="bx" x="180" y="35" width="90" height="38" rx="6"/><text x="225" y="59">b = 5</text>
<text x="150" y="98" class="t2" font-weight="500" font-size="12">int b = a;  → KOPIA wartości</text><text x="150" y="116" class="t2" font-weight="500" font-size="12">zmiana b nie wpływa na a</text>
<text x="490" y="20">Typ referencyjny (class)</text>
<rect class="bx" x="360" y="35" width="70" height="38" rx="6"/><text x="395" y="59">x</text><rect class="bx" x="360" y="90" width="70" height="38" rx="6"/><text x="395" y="114">y</text>
<rect x="520" y="55" width="100" height="50" rx="8" fill="#7e22ce" opacity=".85"/><text x="570" y="85" style="fill:#fff">obiekt</text>
<path d="M430 54C470 54 490 65 518 74M430 109C470 109 490 95 518 88" fill="none" stroke="#7e22ce" stroke-width="2" marker-end="url(#e)"/>
<text x="490" y="152" class="t2" font-weight="500" font-size="12">y = x;  → KOPIA REFERENCJI, nie obiektu</text><text x="490" y="170" class="t2" font-weight="500" font-size="12">zmiana przez y widoczna przez x</text></g>
<defs><marker id="e" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L7 3L0 6z" fill="#7e22ce"/></marker></defs></svg></figure>
<ul><li>Wartościowe: <code>int</code>, <code>double</code>, <code>bool</code>, <code>char</code>, <code>struct</code>, <code>enum</code>, <code>DateTime</code>. Referencyjne: <code>class</code>, <code>string</code>, tablice, delegaty, <code>object</code>.</li>
<li>Struktury <b>nie zawsze</b> lądują na stosie (np. jako pole klasy leżą na stercie) – to popularne uproszczenie.</li>
<li><code>string</code> jest typem <b>referencyjnym</b>, ale <b>niezmiennym</b> (immutable) i ma przeciążone <code>==</code> porównujące <i>zawartość</i>. Wiele konkatenacji w pętli → <code>StringBuilder</code>.</li>
<li>Nullable: <code>int? x = null;</code> operatory <code>??</code> (domyślna wartość) i <code>?.</code> (bezpieczny dostęp).</li></ul>
<h4>Nazewnictwo identyfikatorów</h4>
<ul><li>Może zaczynać się od litery lub <code>_</code>, <b>nie od cyfry</b>. Zawiera litery (także Unicode), cyfry, <code>_</code>.</li><li>Słowo kluczowe można użyć z prefiksem <code>@</code> (<code>@class</code>).</li><li><b>Emoji i znaki specjalne</b> (<code>-</code>, spacja) – <b>niedozwolone</b>.</li></ul>`},
{h:'async/await, LINQ, IDisposable',html:`
<pre>async Task&lt;string&gt; PobierzAsync()
{
    var http = new HttpClient();
    string tekst = await http.GetStringAsync(url);   // wątek wraca do pracy, nie czeka
    return tekst.ToUpper();
}</pre>
<ul><li><code>await</code> <b>nie blokuje</b> wątku – metoda jest „zawieszona”, a wątek robi inną robotę.</li><li>Zwracaj <code>Task</code>/<code>Task&lt;T&gt;</code>. <code>async void</code> tylko dla obsługi zdarzeń (wyjątków nie da się złapać).</li><li><code>.Result</code>/<code>.Wait()</code> na UI/ASP.NET mogą wywołać <b>zakleszczenie</b> (deadlock) – używaj <code>await</code>.</li></ul>
<h4>LINQ</h4>
<pre>var wynik = liczby.Where(n =&gt; n % 2 == 0)    // filtr
                  .Select(n =&gt; n * n)        // projekcja
                  .ToList();                 // TU dopiero się wykonuje</pre>
<p><b>Deferred execution</b>: zapytanie LINQ wykonuje się dopiero przy iteracji lub <code>ToList()/ToArray()/Count()/First()</code>. Każda iteracja wykonuje je od nowa.</p>
<h4>IDisposable i using</h4>
<pre>using var plik = new StreamWriter("log.txt");   // Dispose() zawsze na końcu zakresu
plik.WriteLine("hej");</pre>
<p>GC zwalnia pamięć <b>zarządzaną</b>, ale nie jest deterministyczny – zasoby takie jak pliki, połączenia DB, gniazda zwalniaj przez <code>using</code>/<code>Dispose</code>.</p>`},
{h:'Interfejsy, wyjątki, kolekcje',html:`
<table><tr><th></th><th>Interfejs</th><th>Klasa abstrakcyjna</th></tr>
<tr><td>Dziedziczenie</td><td>klasa może implementować <b>wiele</b></td><td>klasa dziedziczy <b>tylko jedną</b> klasę</td></tr>
<tr><td>Pola / stan</td><td>brak pól</td><td>tak</td></tr>
<tr><td>Implementacje metod</td><td>od C# 8 domyślne implementacje (default interface methods)</td><td>tak</td></tr>
<tr><td>Konstruktory</td><td>nie</td><td>tak</td></tr></table>
<h4>Wyjątki</h4>
<ul><li><code>throw;</code> zachowuje stack trace, <code>throw ex;</code> go <b>resetuje</b>.</li><li>Bloki <code>catch</code> od <b>najbardziej szczegółowego</b> do ogólnego.</li><li><code>finally</code> wykona się niemal zawsze (nie przy np. awarii procesu).</li></ul>
<h4>Kolekcje</h4>
<p><code>List&lt;T&gt;</code> – dynamiczna tablica. <code>Dictionary&lt;K,V&gt;</code> – tablica haszująca, O(1) średnio. <code>HashSet&lt;T&gt;</code> – unikalne elementy. <code>Queue</code>/<code>Stack</code>. Generyki dają bezpieczeństwo typów bez boxingu.</p>
<h4>Nowoczesny C#</h4>
<ul><li><b>record</b> – niezmienny typ z równością po wartościach.</li><li>Pattern matching: <code>if (obj is Osoba { Wiek: &gt; 18 } o)</code>, wyrażenia <code>switch</code>.</li><li>Wersje LTS .NET: m.in. 8 i 10.</li></ul>`}
],
qs:[
{p:1,q:'Które stwierdzenia o <b>typach wartościowych i referencyjnych</b> w C# są prawdziwe?',o:[['<code>struct</code> jest typem wartościowym',1,'Przy przypisaniu kopiowana jest cała wartość.'],['<code>int</code> jest aliasem struktury <code>System.Int32</code>',1,'Typy wbudowane to aliasy typów z przestrzeni System.'],['Po <code>b = a</code> dla zmiennych typu <code>class</code> kopiowana jest referencja, nie obiekt',1,'Obie zmienne wskazują ten sam obiekt.'],['Struktury zawsze są przechowywane na stosie',0,'Np. struct jako pole klasy leży razem z nią na stercie.']],tip:'Value type = kopia danych. Reference type = kopia wskaźnika na wspólny obiekt.'},
{p:3,q:'Które stwierdzenia o <b>stringach</b> w C# są prawdziwe?',o:[['<code>string</code> jest niezmienny (immutable)',1,'Każda „modyfikacja” tworzy nowy obiekt.'],['Operator <code>==</code> porównuje zawartość tekstów',1,'Przeciążony dla string, inaczej niż dla zwykłych obiektów.'],['<code>StringBuilder</code> jest wydajny przy wielu konkatenacjach',1,'Modyfikuje bufor zamiast tworzyć nowe stringi w pętli.'],['<code>string</code> jest typem wartościowym',0,'To typ referencyjny, tylko o semantyce zbliżonej do wartościowej.']],tip:'string = referencyjny, niezmienny, == porównuje treść.'},
{p:1,q:'Które stwierdzenia o <b>interfejsach i klasach abstrakcyjnych</b> w C# są prawdziwe?',o:[['Klasa może implementować wiele interfejsów',1,'To sposób na „wielodziedziczenie” zachowań.'],['Klasa może dziedziczyć tylko po jednej klasie bazowej',1,'C# nie ma wielodziedziczenia klas.'],['Klasa abstrakcyjna może zawierać pola i zaimplementowane metody',1,'Może mieć stan i gotowy kod.'],['Interfejs nigdy nie może mieć implementacji metody',0,'Od C# 8 interfejsy mogą mieć domyślne implementacje.']],tip:'Interfejs = kontrakt (wielokrotny). Klasa abstrakcyjna = częściowa implementacja (pojedyncza).'},
{p:3,q:'Które stwierdzenia o <b>async/await</b> są prawdziwe?',o:[['<code>await</code> nie blokuje wątku wywołującego w oczekiwaniu na wynik',1,'Wątek jest zwalniany do innej pracy; kontynuacja wznowi się później.'],['Metoda <code>async</code> zwraca zwykle <code>Task</code> lub <code>Task&lt;T&gt;</code>',1,'Także ValueTask; void tylko dla zdarzeń.'],['<code>async void</code> należy unikać poza obsługą zdarzeń',1,'Wyjątków z takiej metody nie da się przechwycić przez wywołującego.'],['Użycie <code>.Result</code> zawsze jest bezpieczne i równoważne <code>await</code>',0,'Może blokować wątek i prowadzić do deadlocka, szczególnie w UI i klasycznym ASP.NET.']],tip:'Jeśli piszesz async, to „async all the way” – nie mieszaj z .Result i .Wait().'},
{p:1,q:'Które stwierdzenia o <b>LINQ</b> są prawdziwe?',o:[['Wiele zapytań ma odroczone wykonanie (deferred execution)',1,'Wykonują się dopiero przy iteracji lub wywołaniu ToList(), Count() itp.'],['<code>Where</code> filtruje elementy',1,'Zwraca tylko te, dla których predykat jest true.'],['<code>Select</code> przekształca (projektuje) każdy element',1,'Odpowiednik map w innych językach.'],['<code>ToList()</code> jest leniwe i niczego nie wykonuje',0,'ToList() wymusza natychmiastowe wykonanie zapytania.']],tip:'Zapytanie LINQ to „przepis”, a ToList()/foreach to moment gotowania.'},
{p:3,q:'Które stwierdzenia o <b>zwalnianiu zasobów</b> w C# są prawdziwe?',o:[['<code>using</code> wywołuje <code>Dispose()</code> także wtedy, gdy wystąpi wyjątek',1,'To zapis równoważny try/finally.'],['Garbage Collector automatycznie zwalnia pamięć zarządzaną',1,'Nie trzeba ręcznie zwalniać zwykłych obiektów.'],['GC natychmiast zamyka plik, gdy obiekt wyjdzie poza zakres',0,'GC działa niedeterministycznie – plik może pozostać otwarty długo. Dlatego trzeba użyć using/Dispose.'],['Obiekty trzymające uchwyty (pliki, połączenia) powinny implementować <code>IDisposable</code>',1,'To wzorzec do deterministycznego zwalniania zasobów niezarządzanych.']],tip:'GC = pamięć. using/Dispose = zasoby (pliki, sockety, połączenia DB).'},
{p:1,q:'Które stwierdzenia o <b>typach nullowalnych</b> w C# są prawdziwe?',o:[['<code>int? x = null;</code> jest poprawne',1,'int? to skrót dla Nullable&lt;int&gt;.'],['<code>x ?? 5</code> zwraca 5, gdy x jest null',1,'Operator null-coalescing.'],['<code>s?.Length</code> nie rzuca wyjątku, gdy s jest null',1,'Operator null-conditional zwraca null zamiast NullReferenceException.'],['<code>int x = null;</code> kompiluje się poprawnie',0,'Zwykły int nie może być null; potrzebny jest int?.']],tip:'? przy typie = może być null. ?. = bezpieczne wywołanie. ?? = wartość zastępcza.'},
{p:3,q:'Które stwierdzenia o <b>wyjątkach</b> w C# są prawdziwe?',o:[['<code>throw;</code> zachowuje oryginalny stack trace, a <code>throw ex;</code> go resetuje',1,'Dlatego w catch zwykle pisze się samo throw;.'],['Blok <code>finally</code> wykonuje się niezależnie od tego, czy wyjątek wystąpił',1,'Typowo służy do sprzątania.'],['Bloki <code>catch</code> układa się od najbardziej szczegółowego do najbardziej ogólnego',1,'Kompilator zgłasza błąd, gdy ogólny catch poprzedza szczegółowy.'],['Samo <code>try</code> bez <code>catch</code> i <code>finally</code> jest poprawne',0,'try musi mieć przynajmniej catch lub finally.']],tip:'Zła praktyka: catch (Exception) { } – połknięcie błędu bez śladu.'},
{p:1,q:'Które stwierdzenia o <b>platformie .NET</b> są prawdziwe?',o:[['Kod C# jest kompilowany do kodu pośredniego IL',1,'IL jest niezależny od platformy sprzętowej.'],['IL jest kompilowany do kodu maszynowego przez JIT w środowisku CLR',1,'Kompilacja Just-In-Time podczas uruchamiania (lub AOT).'],['Nowoczesny .NET jest wieloplatformowy (Windows, Linux, macOS)',1,'Od .NET Core, a dziś po prostu .NET 5+.'],['C# działa wyłącznie w systemie Windows',0,'Nieprawda od czasu .NET Core.']],tip:'C# → IL → (JIT) → kod maszynowy. Dlatego jedna binarka IL działa na różnych systemach.'},
{p:3,q:'Które z poniższych <b>nazw zmiennych</b> są poprawne w C#?',o:[['<code>@class</code>',1,'Prefiks @ pozwala użyć słowa kluczowego jako identyfikatora.'],['<code>_licznik</code>',1,'Podkreślenie jest dozwolone, także na początku.'],['<code>2szybki</code>',0,'Identyfikator nie może zaczynać się od cyfry.'],['<code>moja-zmienna</code>',0,'Myślnik jest operatorem odejmowania, nie częścią nazwy.']],tip:'Dozwolone: litery (także Unicode), cyfry (nie na początku), _ i @ jako prefiks. Emoji – nie.'}
]};
