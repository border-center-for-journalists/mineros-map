<script>
	import LeafletMap from './LeafletMap.svelte';
	import * as events from './data/events.json';
	import summarizeAccidents from './helpers/summarizeAccidents.js';
	import Scroller from "@sveltejs/svelte-scroller";
	let selectedTab = 'events';
  	let index = 0, offset, progress;

  	let top = 100/window.innerHeight;
  	let bottom = 50/window.innerHeight;

  	let summary = summarizeAccidents(events);
  	$: all = progress >= 0;
  	$: year = progress >= 0 ? index + 2006 : -1;
</script>

<main>
	<div class='container'>
		<header class:hidden={all}>
			<h1>Accidentes mineros en </h1>
			<h2>Coahuila 2006 - 2021 </h2>
			<h3><strong>{summary.totals.accidents}</strong> accidentes <br/> <strong>{summary.totals.deaths}</strong> muertes <br/><strong>${Intl.NumberFormat().format(summary.totals.ammount/1000000)}MDP</strong> en multas</h3>
		</header>
		<div class='scroll-header' class:visible={all}>
			<div class='container'>
					<nav>
						{#if year >= 0}
							<h4 class='year'>{year}</h4>
							<h4><strong>{summary.years[index].accidents}</strong> <span>accidentes</span> </h4>
							<h4><strong>{summary.years[index].deaths}</strong> <span>muertes </span></h4>
							<h4><strong>${Intl.NumberFormat().format(summary.years[index].ammount)}MN</strong> <span> multas</span></h4>
						{/if}
					</nav>
			</div>
		</div>
		<Scroller {top} {bottom} bind:index bind:offset bind:progress>
		  <div slot="background" class='background'>
			<LeafletMap events={events.default} {year} {all} />
		    <p class='source'>* Fuente STPS mediante solicitudes de información</p>
		  </div>

		  <div slot="foreground" class='foreground'>
		  	{#each summary.years as section}
		    	<section></section>
		    {/each}
		  </div>
		</Scroller>
	</div>
</main>

<style>	
	section {
		height: 50vh;
	}

	h1{
		color: #FF473F;
		font-weight: bold;
		font-size: 45px;
		line-height: 51px;
		margin: 28px 0 0;
	}
	h2{
		font-size: 44px;
		margin: 10px 0;
		line-height: 51px;
		color: white;
		text-align: center;
	}
	h3{
		text-align: center;
		font-size: 14px;
		color: #E3e3e3;
		text-transform: uppercase;
		margin: 0 0 20px;
		letter-spacing: 2.3px;
		line-height: 25px;
		font-weight: normal;
	}
	h3 strong, h4 strong{
		font-weight: bold;
		color:  #FF473F;
	}
	.container{
		max-width: 1150px;
		margin: 0 auto 0;
		position: relative;
	}
	header{		
		transition: opacity 0.5s;
	}
	header.hidden{
		opacity: 0;
		transition: opacity 0.5s;
	}
	.scroll-header.visible{
		opacity: 1;
		transition: opacity 0.5s;
	}
	.scroll-header nav{
		width: 100%;
		display: flex;
	}

	.scroll-header{
		transition: opacity 0.5s;
		position: fixed;
		top: 0;
		left: 0;
		opacity: 0;
		width: calc(100% - 10px);
		margin: 0 8px;
	}
	.scroll-header h4{
		font-size: 15px;
		flex: 1;
		font-weight: normal;
		margin: 0;
		line-height: 25px;
		display: flex;
		flex-direction: column;
		text-align: center;
		margin: 25px 5px;
		justify-content: center;
	}
	.scroll-header h4.year{
		line-height: 50px;
		font-size: 30px;
		font-weight: bold;
	}
	.source{
		text-align: right;
	}
	@media screen and (min-width: 769px) {
    	.scroll-header h4{
    		font-size: 22px;
    		flex-direction: row;
    		margin: 25px 0;
    		line-height: 50px;
    	}
    	.scroll-header h4.year{
    		font-size: 44px;
    	}
    	.scroll-header h4 strong{
    		margin-right: 7px;
    	}
	}

</style>