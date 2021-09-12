<script>
	export let events;
</script>
<div class='container'>
	{#each events as event}
	<article> 
		<i style="border-right:10px solid #{event.color}"></i>
		<nav style="background-color: #{event.color}">{event.letter}</nav>
		<content>
			<img src='photos/{event.letter}.jpeg' alt='{event.text}' />
			<div class='date'>{event.date}</div>
			<p>{event.text}</p>
			{#if event.imageSource}
				<p class='credit'>Foto: {event.imageSource}</p>
			{/if}
		</content>
	</article>
	{/each}
</div>

<style>
	.container{
		display: flex; 
		flex-flow: row wrap;
		max-width: 1100px;
		margin: 30px auto 0;
		position: relative;
		padding-left: 50px;
	}
	.container::before{
		position: absolute;
		left: 15px;
		width: 4px;
		height: 100%;
		background-color: #5f5f5f;
		content: '';
		padding-top: 10px;
	}

	article{
		background-color: #202020;
		display: flex;
		margin: 25px 0 0 0;
		color: white;
		font-size: 14px;
		position: relative;
		flex: 0 1 100%;
	}


/*	@media screen and (min-width: 1130px) {
		article{
			margin:  25px 25px 0 0;
			flex: 0 1 calc(33% - 13px);
		}
		article:nth-child(3n){
			margin-right: 0;
		}
	}*/
	article i{
		content: '';
		width: 0; 
		height: 0; 
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent; 
		border-right:10px solid #FF4840;
		position: absolute;
		top: calc(50% - 5px);
		left: -10px; 
	}
	article::after{
		content: '';
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: white;
		position: absolute;		
		top: 50%;
		left: -38px;
	}
	article nav{
		background-color: #FF4840;
		text-align: center;
		font-size: 30px;
		font-weight: bold;
		padding: 0 14px;
		align-items:center;
        justify-content:center;
        display: flex;
        text-transform: uppercase;
        min-width: 25px;
        margin-right: 15px;
	}
	article content{
		font-size: 16px;
		line-height: 26px;
	}
	article p{
		margin: 2px 0 8px;

	}
	article .credit{
		font-size: 13px;
	}
	article .date{
		color: white;
		text-transform: uppercase;
		font-size: 15px;
		font-weight: bold;
		margin-top: 15px;
	}
	article img{
		max-width: 250px;
		float: left;
		margin: 0 15px 0 -15px;
	}
</style>