drop table if exists _analytics_casereporting_cases_communes;
create table _analytics_casereporting_cases_communes as
select cases.ou, cases.weekly, cases."Du5ydup8qQf", o.uidlevel2, o.uidlevel3, uidlevel1, cases.cases from
(select ou, weekly, "Du5ydup8qQf", count("Du5ydup8qQf") as cases
from analytics_event_agyor29kdyp aepd 
group by ou, weekly, "Du5ydup8qQf"
order by ou desc) as cases
join "_orgunitstructure" o 
on o.organisationunituid = cases.ou;

drop table if exists _analytics_casereporting_cases_districts;
create table _analytics_casereporting_cases_districts as
select uidlevel3, weekly, "Du5ydup8qQf", sum(cases) as cases from _analytics_casereporting_cases_communes
group by uidlevel3, weekly, "Du5ydup8qQf";

drop table if exists _analytics_casereporting_cases_provinces;
create table _analytics_casereporting_cases_provinces as
select uidlevel2, weekly, "Du5ydup8qQf", sum(cases) as cases from _analytics_casereporting_cases_communes
group by uidlevel2, weekly, "Du5ydup8qQf";

drop table if exists _analytics_casereporting_cases_region;
create table _analytics_casereporting_cases_region as
select uidlevel1, weekly, "Du5ydup8qQf", sum(cases) as cases from _analytics_casereporting_cases_communes
group by uidlevel1, weekly, "Du5ydup8qQf";

drop table if exists _analytics_casereporting_deaths_communes;
create table _analytics_casereporting_deaths_communes as
select cases.ou, cases.weekly, cases."Du5ydup8qQf", o.uidlevel2, o.uidlevel3, uidlevel1, cases.cases from
(select ou, weekly, "Du5ydup8qQf", count("Du5ydup8qQf") as cases
from analytics_event_agyor29kdyp aepd 
where "Pip1eJUznxo" = '3'
group by ou, weekly, "Du5ydup8qQf"
order by ou desc) as cases
join "_orgunitstructure" o 
on o.organisationunituid = cases.ou;

drop table if exists _analytics_casereporting_deaths_districts;
create table _analytics_casereporting_deaths_districts as
select uidlevel3, weekly, "Du5ydup8qQf", sum(cases) as cases from _analytics_casereporting_deaths_communes
group by uidlevel3, weekly, "Du5ydup8qQf";

drop table if exists _analytics_casereporting_deaths_provinces;
create table _analytics_casereporting_deaths_provinces as
select uidlevel2, weekly, "Du5ydup8qQf", sum(cases) as cases from _analytics_casereporting_deaths_communes
group by uidlevel2, weekly, "Du5ydup8qQf";

drop table if exists _analytics_casereporting_deaths_region;
create table _analytics_casereporting_deaths_region as
select uidlevel1, weekly, "Du5ydup8qQf", sum(cases) as cases from _analytics_casereporting_deaths_communes
group by uidlevel1, weekly, "Du5ydup8qQf";