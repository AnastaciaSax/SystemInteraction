--
-- PostgreSQL database dump
--

\restrict s3m5sQysSmvGvY29Ubfng387hNvKxNM9S7joxJXrJdOczciwWsAJhrMn5xDWON3

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: country; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.country (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    currency character varying(20) NOT NULL
);


ALTER TABLE public.country OWNER TO postgres;

--
-- Name: country_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.country_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.country_id_seq OWNER TO postgres;

--
-- Name: country_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.country_id_seq OWNED BY public.country.id;


--
-- Name: route; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.route (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    price_usd numeric(10,2) NOT NULL,
    photo_url text,
    description text,
    duration_days integer,
    is_active boolean DEFAULT true,
    "countryId" integer
);


ALTER TABLE public.route OWNER TO postgres;

--
-- Name: route_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.route_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.route_id_seq OWNER TO postgres;

--
-- Name: route_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.route_id_seq OWNED BY public.route.id;


--
-- Name: route_photos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.route_photos (
    id integer NOT NULL,
    route_id integer,
    photo_url text NOT NULL,
    caption character varying(200),
    is_primary boolean DEFAULT false
);


ALTER TABLE public.route_photos OWNER TO postgres;

--
-- Name: route_photos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.route_photos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.route_photos_id_seq OWNER TO postgres;

--
-- Name: route_photos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.route_photos_id_seq OWNED BY public.route_photos.id;


--
-- Name: sale; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sale (
    id integer NOT NULL,
    sale_date date NOT NULL,
    visa_cost_usd numeric(10,2) NOT NULL,
    quantity integer NOT NULL,
    total_cost_usd numeric(12,2) NOT NULL,
    "routeId" integer
);


ALTER TABLE public.sale OWNER TO postgres;

--
-- Name: sale_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sale_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sale_id_seq OWNER TO postgres;

--
-- Name: sale_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sale_id_seq OWNED BY public.sale.id;


--
-- Name: country id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country ALTER COLUMN id SET DEFAULT nextval('public.country_id_seq'::regclass);


--
-- Name: route id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.route ALTER COLUMN id SET DEFAULT nextval('public.route_id_seq'::regclass);


--
-- Name: route_photos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.route_photos ALTER COLUMN id SET DEFAULT nextval('public.route_photos_id_seq'::regclass);


--
-- Name: sale id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sale ALTER COLUMN id SET DEFAULT nextval('public.sale_id_seq'::regclass);


--
-- Data for Name: country; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.country (id, name, currency) FROM stdin;
1	Turkey	USD
2	Egypt	USD
3	Spain	EUR
4	Italy	EUR
5	Thailand	USD
6	Greece	EUR
7	France	EUR
8	USA	USD
\.


--
-- Data for Name: route; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.route (id, name, price_usd, photo_url, description, duration_days, is_active, "countryId") FROM stdin;
1	Istanbul Cultural Tour	1200.00	https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=500	Explore the rich history of Istanbul	7	t	1
2	Antalya Beach Vacation	800.00	https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500	Relax on beautiful beaches	10	t	1
3	Cairo and Pyramids	1500.00	https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=500	Discover ancient pyramids	8	t	2
4	Barcelona and Madrid	1800.00	https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=500	Vibrant cities of Spain	10	t	3
5	Rome and Florence	2200.00	https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500	Art and history of Italy	9	t	4
6	Bangkok and Pattaya	1000.00	https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=500	Exotic Thailand experience	10	t	5
7	Athens and Santorini	2100.00	https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500	Ancient history and sunsets	11	t	6
8	Paris Romantic Getaway	2500.00	https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=500	Eiffel Tower and Louvre	6	t	7
9	New York City Adventure	2200.00	https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500	Times Square and Broadway	7	t	8
10	California Road Trip	3000.00	https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500	LA, San Francisco and coast	14	t	8
\.


--
-- Data for Name: route_photos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.route_photos (id, route_id, photo_url, caption, is_primary) FROM stdin;
\.


--
-- Data for Name: sale; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sale (id, sale_date, visa_cost_usd, quantity, total_cost_usd, "routeId") FROM stdin;
1	2024-01-15	50.00	2	2500.00	1
2	2024-01-20	50.00	1	1250.00	1
3	2024-02-05	25.00	3	2475.00	2
4	2024-02-10	60.00	2	3120.00	3
5	2024-03-01	80.00	4	7520.00	4
6	2024-04-02	40.00	1	1040.00	6
8	2024-04-12	25.00	2	4250.00	7
9	2024-05-01	80.00	3	7740.00	8
10	2024-05-20	60.00	5	11300.00	9
11	2024-06-25	50.00	3	3750.00	1
13	2024-07-05	25.00	2	1650.00	2
7	2024-03-15	90.00	2	4580.00	5
14	2024-07-15	60.00	4	6240.00	3
16	2024-08-20	90.00	3	6870.00	5
15	2024-08-01	80.00	1	1880.00	4
12	2024-06-10	70.00	2	6140.00	10
17	2024-09-05	40.00	2	2080.00	6
18	2024-09-18	25.00	5	10625.00	7
19	2024-10-10	80.00	2	5160.00	8
20	2024-11-05	70.00	4	12280.00	10
21	2024-10-25	60.00	1	2260.00	9
22	2024-11-20	50.00	2	2500.00	1
23	2024-12-01	25.00	3	2475.00	2
24	2024-12-15	60.00	2	3120.00	3
25	2024-12-28	80.00	1	1880.00	4
26	2024-12-20	90.00	2	4580.00	5
27	2024-12-22	40.00	3	3120.00	6
28	2024-12-24	25.00	4	8500.00	7
29	2024-12-26	80.00	1	2580.00	8
30	2024-12-28	60.00	2	4520.00	9
31	2024-12-30	70.00	3	9210.00	10
32	2024-12-31	50.00	2	2500.00	1
\.


--
-- Name: country_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.country_id_seq', 8, true);


--
-- Name: route_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.route_id_seq', 10, true);


--
-- Name: route_photos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.route_photos_id_seq', 1, false);


--
-- Name: sale_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sale_id_seq', 32, true);


--
-- Name: country country_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_name_key UNIQUE (name);


--
-- Name: country country_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_pkey PRIMARY KEY (id);


--
-- Name: route_photos route_photos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.route_photos
    ADD CONSTRAINT route_photos_pkey PRIMARY KEY (id);


--
-- Name: route route_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.route
    ADD CONSTRAINT route_pkey PRIMARY KEY (id);


--
-- Name: sale sale_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sale
    ADD CONSTRAINT sale_pkey PRIMARY KEY (id);


--
-- Name: route route_countryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.route
    ADD CONSTRAINT "route_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES public.country(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: sale sale_routeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sale
    ADD CONSTRAINT "sale_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES public.route(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

\unrestrict s3m5sQysSmvGvY29Ubfng387hNvKxNM9S7joxJXrJdOczciwWsAJhrMn5xDWON3

