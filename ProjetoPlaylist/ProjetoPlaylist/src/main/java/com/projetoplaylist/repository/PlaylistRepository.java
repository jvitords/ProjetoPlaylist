package com.projetoplaylist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projetoplaylist.entities.Playlist;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long>{
	List<Playlist> findByNameContainingIgnoreCase(String palavra); // encontra playlist que conter a string do argumento passado
	void deleteByName(String name);
	Playlist findByName(String name);
	Boolean existsByNameIgnoreCase(String playlist);
}
