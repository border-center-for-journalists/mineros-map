<script>
	export let contracts;
	const _contracts = contracts.map(c => {

	});
</script>
<main>
	{#each contracts as contract}
		<article class:downloadable={contract.filename}>
			{#if contract.filename}
				<a href='contracts/{contract.filename}' target='_blank' class='article downloadable'> </a>
			{/if}
			<nav>
				{#if contract.filename}
					<i class='material-icons'>download</i>
				{/if}
			</nav>
			<content>
				<p class='company'>{contract.company}</p>
				<p class='title'>{contract.key}</p>
				<p class='title'>{contract.concept}</p>
				<p class='ammount'>{contract.ammount}</p>
			</content>
		</article>
	{/each}
</main>
<style>
	main{
		display: flex;
		flex-flow: row wrap;
		max-width: 1150px;
		margin: 0 auto;
	}
	article{
		display: flex;
		color: white;
		padding: 8px 15px;
		border:  3px solid #787878;
		border-radius: 5px;
		margin: 25px 0 0 0;
		flex: 0 1 100%;
		position: relative;
	}
	@media screen and (min-width: 1130px) {
		article{
			margin:  25px 25px 0 0;
			flex: 0 1 calc(33% - 49px);
		}
		article:nth-child(3n){
			margin-right: 0;
		}
	}
	article a{
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	article.downloadable{
		cursor: pointer;
	}
	article.downloadable:hover{
		color: black;
		background-color: white;
		transition: all 300ms ease;
		border: 3px solid #878787;
	}
	article nav{
		padding: 5px 7px 0 5px;
	}
	article nav i{
		font-size: 24px;
	}
	.title{
		font-size: 13px;
		line-height: 15px;
		margin:  10px auto;
	}
	.company{
		font-size: 17px;
		line-height: 25px;
		text-transform: uppercase;
		margin: 0 0 5px 0;
	}
	.ammount{
		font-size:  17px;
		color: #FE4940;
		margin: 0;
	}
</style>