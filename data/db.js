BANK.db={name:'Bazy danych',icon:'🗄️',color:'#1d4ed8',
intro:'SQL, transakcje, normalizacja, indeksy. Na BTI często trzeba „wykonać zapytanie w głowie” i znać różnice między podobnymi poleceniami (DELETE/TRUNCATE/DROP).',
lessons:[
{h:'Kolejność wykonania zapytania SQL',html:`
<p>Piszemy <code>SELECT</code> pierwsze, ale baza wykonuje je prawie na końcu. To tłumaczy, czemu w <code>WHERE</code> nie widać aliasów z <code>SELECT</code>.</p>
<figure class="diagram"><svg viewBox="0 0 700 120" width="700" role="img" aria-label="Kolejność wykonania SQL">
<g font-size="13" font-weight="700" text-anchor="middle">
<rect class="bx" x="4" y="30" width="86" height="44" rx="8"/><text x="47" y="57">1 FROM / JOIN</text>
<rect class="bx" x="102" y="30" width="86" height="44" rx="8"/><text x="145" y="57">2 WHERE</text>
<rect class="bx" x="200" y="30" width="90" height="44" rx="8"/><text x="245" y="57">3 GROUP BY</text>
<rect class="bx" x="302" y="30" width="86" height="44" rx="8"/><text x="345" y="57">4 HAVING</text>
<rect class="bx" x="400" y="30" width="86" height="44" rx="8"/><text x="443" y="57">5 SELECT</text>
<rect class="bx" x="498" y="30" width="96" height="44" rx="8"/><text x="546" y="57">6 ORDER BY</text>
<rect class="bx" x="606" y="30" width="90" height="44" rx="8"/><text x="651" y="57">7 LIMIT</text></g>
<g font-size="11" class="t2" text-anchor="middle"><text x="47" y="96">skąd dane</text><text x="145" y="96">filtr wierszy</text><text x="245" y="96">grupy</text><text x="345" y="96">filtr grup</text><text x="443" y="96">kolumny, aliasy</text><text x="546" y="96">sortowanie</text><text x="651" y="96">ucięcie</text></g>
<path class="ln" d="M90 52H100M188 52H198M290 52H300M388 52H398M486 52H496M594 52H604"/></svg></figure>
<ul><li><b>WHERE</b> filtruje <i>wiersze przed</i> grupowaniem, nie może używać agregatów (<code>COUNT</code>, <code>SUM</code>).</li>
<li><b>HAVING</b> filtruje <i>grupy po</i> agregacji.</li>
<li><b>ORDER BY</b> jest po SELECT, więc widzi aliasy.</li></ul>
<pre>SELECT dzial, COUNT(*) AS ile
FROM pracownicy
WHERE aktywny = 1          -- najpierw odrzuć nieaktywnych
GROUP BY dzial
HAVING COUNT(*) &gt; 5       -- potem zostaw działy większe niż 5
ORDER BY ile DESC;         -- alias "ile" wolno użyć dopiero tutaj</pre>`},
{h:'Rodzaje JOIN-ów na rysunku',html:`
<p>Dane: <b>A(id)</b> = 1, 2, 3 oraz <b>B(a_id)</b> = 1, 1, 4. Łączymy po <code>A.id = B.a_id</code>.</p>
<figure class="diagram"><svg viewBox="0 0 700 215" width="700" role="img" aria-label="JOINy jako diagramy Venna">
<defs><clipPath id="ca"><circle cx="40" cy="70" r="36"/></clipPath></defs>
<g font-size="12" text-anchor="middle">
<g transform="translate(0,0)"><circle cx="55" cy="70" r="36" fill="none" class="ln"/><circle cx="95" cy="70" r="36" fill="none" class="ln"/><path d="M75 39.6A36 36 0 0 1 75 100.4A36 36 0 0 1 75 39.6z" fill="#1d4ed8" opacity=".8"/><text x="75" y="130" font-weight="800">INNER JOIN</text><text x="75" y="148" class="t2">część wspólna</text><text x="75" y="166" font-weight="700" style="fill:#1d4ed8">2 wiersze</text></g>
<g transform="translate(180,0)"><circle cx="55" cy="70" r="36" fill="#1d4ed8" opacity=".35"/><circle cx="95" cy="70" r="36" fill="none" class="ln"/><circle cx="55" cy="70" r="36" fill="none" class="ln"/><path d="M75 39.6A36 36 0 0 1 75 100.4A36 36 0 0 1 75 39.6z" fill="#1d4ed8" opacity=".8"/><text x="75" y="130" font-weight="800">LEFT JOIN</text><text x="75" y="148" class="t2">wszystko z A + pasujące B</text><text x="75" y="166" font-weight="700" style="fill:#1d4ed8">4 wiersze</text></g>
<g transform="translate(360,0)"><circle cx="95" cy="70" r="36" fill="#1d4ed8" opacity=".35"/><circle cx="55" cy="70" r="36" fill="none" class="ln"/><circle cx="95" cy="70" r="36" fill="none" class="ln"/><path d="M75 39.6A36 36 0 0 1 75 100.4A36 36 0 0 1 75 39.6z" fill="#1d4ed8" opacity=".8"/><text x="75" y="130" font-weight="800">RIGHT JOIN</text><text x="75" y="148" class="t2">wszystko z B + pasujące A</text><text x="75" y="166" font-weight="700" style="fill:#1d4ed8">3 wiersze</text></g>
<g transform="translate(540,0)"><circle cx="55" cy="70" r="36" fill="#1d4ed8" opacity=".6"/><circle cx="95" cy="70" r="36" fill="#1d4ed8" opacity=".6"/><circle cx="55" cy="70" r="36" fill="none" class="ln"/><circle cx="95" cy="70" r="36" fill="none" class="ln"/><text x="75" y="130" font-weight="800">FULL OUTER JOIN</text><text x="75" y="148" class="t2">wszystko z obu</text><text x="75" y="166" font-weight="700" style="fill:#1d4ed8">5 wierszy</text></g>
</g>
<text x="350" y="200" text-anchor="middle" font-size="12" class="t2">A = {1,2,3}, B = {1,1,4}. INNER: 1-1, 1-1. LEFT dodaje 2-NULL i 3-NULL. RIGHT dodaje NULL-4. FULL ma wszystko.</text></svg></figure>
<div class="callout tip">Jedno id po lewej, które pasuje do <b>dwóch</b> wierszy po prawej, daje <b>dwa</b> wiersze wyniku. Dlatego INNER JOIN powyżej zwraca 2, nie 1. Licz wiersze po stronie „wielu”.</div>`},
{h:'DML, DDL i różnice DELETE / TRUNCATE / DROP',html:`
<table><tr><th>Grupa</th><th>Polecenia</th><th>Dotyczy</th></tr>
<tr><td><b>DDL</b> (definicje)</td><td>CREATE, ALTER, DROP, TRUNCATE</td><td>struktury (tabele, indeksy)</td></tr>
<tr><td><b>DML</b> (dane)</td><td>INSERT, UPDATE, DELETE, (SELECT)</td><td>wiersze</td></tr>
<tr><td><b>DCL</b> (uprawnienia)</td><td>GRANT, REVOKE</td><td>dostęp</td></tr>
<tr><td><b>TCL</b> (transakcje)</td><td>COMMIT, ROLLBACK, SAVEPOINT</td><td>transakcje</td></tr></table>
<table><tr><th></th><th>DELETE</th><th>TRUNCATE</th><th>DROP</th></tr>
<tr><td>Usuwa</td><td>wybrane lub wszystkie wiersze (WHERE)</td><td><b>wszystkie</b> wiersze</td><td>całą tabelę razem ze strukturą</td></tr>
<tr><td>Struktura tabeli</td><td>zostaje</td><td>zostaje</td><td><b>znika</b></td></tr>
<tr><td>WHERE</td><td>tak</td><td>nie</td><td>nie</td></tr>
<tr><td>Szybkość</td><td>wolniejszy (loguje wiersz po wierszu)</td><td>szybki</td><td>szybki</td></tr>
<tr><td>Rollback</td><td>tak</td><td>zależy od silnika (PostgreSQL tak, MySQL nie)</td><td>j.w.</td></tr></table>
<div class="callout trap"><code>DELETE FROM t;</code> <b>bez WHERE</b> też usuwa wszystkie rekordy i zostawia tabelę. Pytanie „które polecenia usuwają wszystkie rekordy bez usuwania tabeli?” ma więc <b>dwie</b> poprawne odpowiedzi: DELETE i TRUNCATE.</div>`},
{h:'Transakcje i ACID',html:`
<figure class="diagram"><svg viewBox="0 0 680 150" width="680" role="img" aria-label="ACID">
<g font-size="14" text-anchor="middle"><rect class="bx" x="5" y="10" width="155" height="105" rx="12"/><text x="82" y="42" font-size="30" font-weight="900" style="fill:#1d4ed8">A</text><text x="82" y="66" font-weight="700">Atomicity</text><text x="82" y="86" class="t2" font-size="12">wszystko albo nic</text>
<rect class="bx" x="175" y="10" width="155" height="105" rx="12"/><text x="252" y="42" font-size="30" font-weight="900" style="fill:#1d4ed8">C</text><text x="252" y="66" font-weight="700">Consistency</text><text x="252" y="86" class="t2" font-size="12">zachowane ograniczenia</text>
<rect class="bx" x="345" y="10" width="155" height="105" rx="12"/><text x="422" y="42" font-size="30" font-weight="900" style="fill:#1d4ed8">I</text><text x="422" y="66" font-weight="700">Isolation</text><text x="422" y="86" class="t2" font-size="12">transakcje nie wchodzą sobie w drogę</text>
<rect class="bx" x="515" y="10" width="155" height="105" rx="12"/><text x="592" y="42" font-size="30" font-weight="900" style="fill:#1d4ed8">D</text><text x="592" y="66" font-weight="700">Durability</text><text x="592" y="86" class="t2" font-size="12">po COMMIT przetrwa awarię</text></g>
<text x="340" y="140" text-anchor="middle" font-size="12" class="t2">Klasyk: przelew 100 zł = (−100 z konta A) + (+100 na konto B). Albo oba kroki, albo żaden.</text></svg></figure>
<pre>BEGIN;
UPDATE konto SET saldo = saldo - 100 WHERE id = 1;
UPDATE konto SET saldo = saldo + 100 WHERE id = 2;
COMMIT;   -- albo ROLLBACK; jeśli coś poszło nie tak</pre>
<p><b>Izolacja</b> nie oznacza, że transakcje fizycznie wykonują się po kolei, tylko że <i>wyglądają</i> tak, jakby tak było (w zależności od poziomu: READ COMMITTED, REPEATABLE READ, SERIALIZABLE). Anomalie: <i>dirty read</i>, <i>non-repeatable read</i>, <i>phantom read</i>.</p>`},
{h:'Klucze, normalizacja, indeksy, NoSQL',html:`
<ul>
<li><b>Klucz główny (PK)</b>: unikalny i NOT NULL, tylko jeden na tabelę (może być złożony).</li>
<li><b>Klucz obcy (FK)</b>: odwołuje się do PK innej tabeli; może przyjmować NULL (jeśli kolumna na to pozwala) i się powtarzać.</li>
<li><b>UNIQUE</b>: unikalność; może być wiele ograniczeń UNIQUE na tabelę.</li>
</ul>
<table><tr><th>Postać</th><th>Wymóg</th></tr>
<tr><td>1NF</td><td>wartości atomowe (brak list w komórce), brak powtarzających się grup</td></tr>
<tr><td>2NF</td><td>1NF + brak zależności częściowych od <i>części</i> klucza złożonego</td></tr>
<tr><td>3NF</td><td>2NF + brak zależności przechodnich (kolumna niekluczowa zależy od innej niekluczowej)</td></tr></table>
<p>Mnemonik: „każdy atrybut zależy od <b>klucza</b> (1NF), <b>całego klucza</b> (2NF) i <b>niczego poza kluczem</b> (3NF)”. Denormalizacja bywa świadomie stosowana dla szybkości odczytu.</p>
<h4>Indeks (B-tree)</h4>
<ul><li>Przyspiesza <code>SELECT</code>, <code>WHERE</code>, <code>JOIN</code>, <code>ORDER BY</code>.</li><li><b>Spowalnia</b> INSERT/UPDATE/DELETE (trzeba aktualizować indeks) i zajmuje miejsce.</li><li><code>LIKE '%abc'</code> (znak wieloznaczny na początku) nie wykorzysta zwykłego indeksu B-tree. Funkcja na kolumnie w WHERE też często go „zasłania”.</li></ul>
<h4>NULL – trzecia wartość logiki</h4>
<p><code>NULL = NULL</code> daje <i>UNKNOWN</i>, nie TRUE. Używaj <code>IS NULL</code>. <code>COUNT(kolumna)</code> pomija NULL-e, <code>COUNT(*)</code> liczy wszystkie wiersze.</p>
<h4>NoSQL i CAP</h4>
<table><tr><th>Typ</th><th>Przykład</th></tr><tr><td>Dokumentowa</td><td>MongoDB</td></tr><tr><td>Klucz-wartość</td><td>Redis, DynamoDB</td></tr><tr><td>Kolumnowa (wide-column)</td><td>Cassandra</td></tr><tr><td>Grafowa</td><td>Neo4j</td></tr></table>
<p><b>CAP</b>: przy partycji sieci musisz wybrać spójność (C) albo dostępność (A).</p>`}
],
qs:[
{p:1,q:'Które polecenia należą do <b>DDL</b> (Data Definition Language)?',o:[['CREATE TABLE',1,'Definiuje strukturę – klasyczne DDL.'],['ALTER TABLE',1,'Zmienia strukturę tabeli – DDL.'],['TRUNCATE TABLE',1,'W standardowej klasyfikacji to DDL (operuje na tabeli, nie na pojedynczych wierszach).'],['DELETE',0,'To DML – manipuluje wierszami, a nie strukturą.']],tip:'DDL zmienia kształt bazy, DML zmienia dane. DELETE (wiersze) vs DROP/TRUNCATE (tabela jako obiekt).'},
{p:3,q:'Który zapis dotyczący <b>WHERE</b> i <b>HAVING</b> jest prawdziwy?',o:[['WHERE filtruje wiersze przed grupowaniem',1,'WHERE działa na surowych wierszach, zanim powstaną grupy.'],['HAVING filtruje grupy po agregacji',1,'Dlatego może używać COUNT(*), SUM() itd.'],['W WHERE można bezpośrednio używać COUNT(*)',0,'Agregaty nie istnieją jeszcze na etapie WHERE (poprawnie: HAVING).'],['HAVING wykonuje się przed GROUP BY',0,'Kolejność: WHERE → GROUP BY → HAVING.']],tip:'Pomocnicze zdanie: „WHERE tnie wiersze, HAVING tnie grupy”.'},
{p:1,q:'Które stwierdzenia o <b>ACID</b> są prawdziwe?',o:[['Atomowość: transakcja wykonuje się w całości albo wcale',1,'Przy błędzie robimy rollback do stanu sprzed transakcji.'],['Trwałość: po COMMIT dane przetrwają awarię systemu',1,'Zapewnia ją m.in. dziennik transakcji (WAL).'],['Spójność: transakcja przeprowadza bazę z jednego poprawnego stanu w drugi, z zachowaniem ograniczeń',1,'Np. nie wolno złamać klucza obcego ani CHECK.'],['Izolacja oznacza, że transakcje fizycznie wykonują się zawsze jedna po drugiej',0,'Mogą działać równolegle; izolacja gwarantuje tylko, że efekt jest <i>jak gdyby</i> sekwencyjny (zależnie od poziomu izolacji).']],tip:'ACID = Atomicity, Consistency, Isolation, Durability.'},
{p:3,q:'Tabela <code>A.id</code> = {1,2,3}, tabela <code>B.a_id</code> = {1,1,4}. Połączenie po <code>A.id = B.a_id</code>. Które zdania są <b>prawdziwe</b>?',o:[['INNER JOIN zwraca 2 wiersze',1,'Pasuje tylko id=1, ale występuje dwa razy w B → 2 wiersze.'],['LEFT JOIN (A po lewej) zwraca 4 wiersze',1,'2 wiersze z id=1 + wiersze dla id=2 i id=3 z NULL po prawej = 4.'],['RIGHT JOIN zwraca 2 wiersze',0,'RIGHT zwraca wszystko z B: dwa razy 1 plus 4 (z NULL po lewej) = 3 wiersze.'],['FULL OUTER JOIN zwraca 5 wierszy',1,'2 (dopasowane) + 2 i 3 z A + 4 z B = 5.']],tip:'Najpierw wypisz dopasowane pary, potem dodaj „niedopasowane” z odpowiedniej strony.'},
{p:3,q:'Które zdania o <b>NULL</b> w SQL są prawdziwe?',o:[['<code>WHERE kolumna IS NULL</code> znajdzie wiersze bez wartości',1,'Do sprawdzania NULL służy IS NULL / IS NOT NULL.'],['<code>COUNT(kolumna)</code> nie liczy wierszy, w których kolumna jest NULL',1,'Agregaty (poza COUNT(*)) ignorują NULL.'],['<code>COUNT(*)</code> liczy wszystkie wiersze, także z NULL-ami',1,'COUNT(*) liczy wiersze, a nie wartości.'],['<code>NULL = NULL</code> daje TRUE',0,'Wynik to UNKNOWN (czyli wiersz nie przechodzi filtra). Porównanie z NULL przez = nigdy nie zwraca TRUE.']],tip:'NULL = „nieznane”. Każde porównanie z nieznanym jest nieznane, a nie prawdziwe.'},
{p:1,q:'Które stwierdzenia o <b>normalizacji</b> są prawdziwe?',o:[['1NF wymaga atomowych wartości w komórkach',1,'Nie wolno trzymać listy „a,b,c” w jednej kolumnie.'],['3NF eliminuje zależności przechodnie',1,'Atrybut niekluczowy nie może zależeć od innego niekluczowego.'],['Denormalizacja może przyspieszyć odczyty kosztem redundancji',1,'Częsty kompromis w hurtowniach danych i systemach z przewagą odczytów.'],['2NF dotyczy wyłącznie tabel bez klucza głównego',0,'2NF dotyczy zależności częściowych od <i>części</i> klucza złożonego.']],tip:'„Klucz, cały klucz i nic oprócz klucza”.'},
{p:3,q:'Które stwierdzenia o <b>indeksach</b> są prawdziwe?',o:[['Zwykle przyspieszają zapytania odczytujące z użyciem warunku na zindeksowanej kolumnie',1,'Zamiast skanować całą tabelę, baza szuka w drzewie B-tree.'],['Mogą spowalniać INSERT, UPDATE i DELETE',1,'Każda zmiana danych wymaga aktualizacji także indeksu.'],['Najczęstszą strukturą indeksu w bazach relacyjnych jest B-tree',1,'Obsługuje porównania, zakresy i sortowanie.'],['Indeks przyspiesza absolutnie każde zapytanie',0,'Np. <code>LIKE \'%abc\'</code> czy mała tabela – skan pełny bywa tańszy; optymalizator sam decyduje.']],tip:'Indeksy to kompromis: szybszy odczyt kosztem zapisu i miejsca.'},
{p:1,q:'Które stwierdzenia o <b>kluczach</b> są prawdziwe?',o:[['Klucz główny jest unikalny i nie może być NULL',1,'Identyfikuje wiersz jednoznacznie.'],['Tabela może mieć tylko jeden klucz główny (może być złożony)',1,'Jedna definicja PK, choć może obejmować kilka kolumn.'],['Klucz obcy może przyjmować wartość NULL (jeśli kolumna na to pozwala)',1,'NULL oznacza „brak powiązania”.'],['Wartości klucza obcego muszą być unikalne',0,'Wiele wierszy dziecka może wskazywać tego samego rodzica (relacja 1:N).']],tip:'PK = tożsamość wiersza, FK = wskaźnik na wiersz w innej tabeli.'},
{p:3,q:'Które stwierdzenia o <b>bazach NoSQL i twierdzeniu CAP</b> są prawdziwe?',o:[['MongoDB jest bazą dokumentową',1,'Przechowuje dokumenty JSON/BSON.'],['Redis jest typowo bazą klucz–wartość trzymającą dane w pamięci',1,'Stąd ogromna szybkość, często używany jako cache.'],['CAP: przy partycji sieciowej trzeba wybrać między spójnością a dostępnością',1,'Partycji w systemie rozproszonym nie da się uniknąć, więc kompromis dotyczy C i A.'],['Cassandra to relacyjna baza z pełnym ACID jak PostgreSQL',0,'To kolumnowa baza rozproszona z modelem „eventual consistency”, nie klasyczny relacyjny ACID.']],tip:'NoSQL ≠ „bez SQL”, tylko „nie tylko relacyjne”. Wybór zależy od modelu danych i wymagań spójności.'},
{p:1,q:'Które stwierdzenia o <b>kolejności wykonania</b> zapytania są prawdziwe?',o:[['FROM jest wykonywane przed WHERE',1,'Najpierw trzeba wiedzieć, z jakich tabel czytamy.'],['GROUP BY jest wykonywane przed HAVING',1,'HAVING filtruje już powstałe grupy.'],['Aliasy z SELECT można używać w ORDER BY',1,'ORDER BY działa po SELECT.'],['Aliasy z SELECT można używać w WHERE (standard SQL)',0,'WHERE jest przed SELECT – alias jeszcze nie istnieje.']],tip:'Pamiętaj sekwencję: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.'}
]};
