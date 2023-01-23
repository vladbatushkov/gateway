# Docker run MSSQL

``` docker
 docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=yourStrong(!)Password" -e "MSSQL_PID=Express" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest
```

# Connection String 

```
Server=localhost,1433;Database=TagDB;User Id=sa;Password=yourStrong(!)Password;TrustServerCertificate=True
```
# Migration Command

```
dotnet ef migrations add AddTagToDB
```

# Create Database Command

```
 dotnet ef database update
```


