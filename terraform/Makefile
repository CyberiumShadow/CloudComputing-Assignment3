env-up:
	cd environment && terraform init
	cd environment && terraform apply --auto-approve

env-down: 
	cd environment && terraform destroy --auto-approve

infra-up:
	cd infrastructure && terraform init
	cd infrastructure && terraform apply --auto-approve

infra-down:
	cd infrastructure && terraform destroy --auto-approve